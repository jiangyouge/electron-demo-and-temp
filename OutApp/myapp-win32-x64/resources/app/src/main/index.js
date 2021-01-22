'use strict'

import { app, Menu, Tray, dialog, BrowserWindow, ipcMain } from 'electron'

import path from 'path'
import fs from 'fs'
import jsmediatags from 'jsmediatags'
import async from 'async'

import store from './store'
import MusicServer from './musicServer'
import IPC from '../IPC.js'
import createNewPage2Window from './newPage'
let tray = null

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
global.storage = {
  main: 'main.storage'
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  // 给项目添加私有功能第一步
  // 定义窗口
  mainWindow = new BrowserWindow({
    height: 600,
    width: 1200,
    titleBarStyle: 'hidden-inset', // 窗口标题栏样式
    frame: false, // 关闭菜单栏
    id: 111, // 唯一id
    title: 'home', // 唯一title
    transparent: true
    // useContentSize: true, // 窗口透明
  })
  // 打开页面地址
  mainWindow.loadURL(winURL)
  // 关闭窗口回收变量
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // 引入newPage.js，负责悬浮窗口内主进程和渲染进程之间的通信
  global.win1Id = mainWindow.id
  console.log('mainWindow.id == ', mainWindow.id)
}

// 设置系统托盘
function createTray () {
  let iconPath = path.join(__static, 'icons/icon.png')
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '选择文件夹', type: 'normal', click: onChooseFolderClick
    },
    {label: '退出', type: 'normal', role: 'quit'}
  ])
  contextMenu.items[1].checked = false
  tray.setContextMenu(contextMenu)
  tray.setToolTip('vue-temp-electron-tip') // 鼠标hover提示
}
// 点击选择文件夹
function onChooseFolderClick () {
  const musicPaths = dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  console.log('musicPaths - 1 == ', musicPaths)
  if (musicPaths !== null && musicPaths !== 'undefined') {
    sendMusicList(musicPaths)
  }
}
// 查找音乐文件列表
function sendMusicList (musicPaths) {
  console.log(' musicPaths - 2 == ', musicPaths)
  if (mainWindow) {
    store.set('MUSIC_PATHS', musicPaths)
    musicPaths.forEach((filePath) => {
      if (fs.existsSync(filePath)) { // 路径是否存在
        let fileNames = fs.readdirSync(filePath) // 返回给定目录的所有文件名或对象
        console.log('fileNames == ', fileNames)
        fileNames = fileNames.filter((fileName) => { // we just need .mp3 files
          let fullPath = path.join(filePath, fileName)
          try {
            let stats = fs.statSync(fullPath)
            console.log('mp3 - ', stats.isFile(), path.extname(fullPath) === '.mp3')
            return stats.isFile() && path.extname(fullPath) === '.mp3'
          } catch (e) {
          }
        })
        console.log('fileNames == ', fileNames)
        if (fileNames.length <= 0) {
          mainWindow.webContents.send(IPC.SET_MUSIC_LIST, [])
        } else {
          async.map(fileNames, (fileName, callback) => {
            let fullPath = path.join(filePath, fileName)
            new jsmediatags.Reader(fullPath).setTagsToRead(['title', 'artist']).read({
              onSuccess: ({tags}) => {
                callback(null, {fileName, artist: tags.artist, title: tags.title})
              }
            })
          }, (err, results) => {
            console.log('err == ', err)
            mainWindow.webContents.send(IPC.SET_MUSIC_LIST, results)
          })
        }
      } else {
        mainWindow.webContents.send(IPC.SET_MUSIC_LIST, [])
      }
    })
  }
}

// Main进程
ipcMain.on('synchronous-message', (event, arg) => { // arg为接受到的消息
  console.log('Main进程 - synchronous-message')
  event.returnValue = 'pong' // 返回一个'pong'
})

ipcMain.on('asynchronous-message', (event, arg) => { // arg为接受到的消息
  console.log('Main进程 - asynchronous-message')
  event.sender.send('asynchronous-reply', 'asyncPong') // 返回一个'asyncPong'
})

app.on('ready', () => {
  createTray()
  new MusicServer().start()
  createWindow()

  // Main进程
  mainWindow.webContents.send('webContents-message', {msg: 'webContents-message'}) // mainWindow是一个BrowserWindow实例

  global.newPage2Window = createNewPage2Window(BrowserWindow)
  // const win2Id = remote.getGlobal('storage')
  // console.log('createNewPage2Window == ', global.newPage2Window.remote.getCurrentWebContents().getProcessId())
  // const win2Id = createNewPage2Window.global.win2Id
  // console.log('win2Id == ', win2Id)
  // mainWindow.webContents.send('distributeIds', {
  //   win2Id: win2Id
  // })
  global.winIdObj = {}
  ipcMain.on('win-id', (event, arg1, arg2) => { // arg为接受到的消息
    console.log('win-id - arg1, arg2 == ', arg1, arg2)
    global[arg1] = arg2
    // event.returnValue = 'pong' // 返回一个'pong'
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // 在macOS中手动退出
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

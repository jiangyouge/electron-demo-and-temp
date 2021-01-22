'use strict'

// import { app, Menu, Tray, dialog, BrowserWindow, ipcMain } from 'electron'

// import path from 'path'
// import fs from 'fs'

// import store from './store'
// import createNewPage2Window from './newPage'
// let tray = null

// /**
//  * Set `__static` path to static files in production
//  * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
//  */
// if (process.env.NODE_ENV !== 'development') {
//   global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
// }
// global.storage = {
//   main: 'main.storage'
// }

// let mainWindow
// const winURL = process.env.NODE_ENV === 'development'
//   ? `http://localhost:9080/`
//   : `file://${__dirname}/index.html`

// function createWindow () {
//   /**
//    * Initial window options
//    */
//   // 给项目添加私有功能第一步
//   // 定义窗口
//   mainWindow = new BrowserWindow({
//     height: 600,
//     width: 1200,
//     titleBarStyle: 'hidden-inset', // 窗口标题栏样式
//     frame: true, // 关闭菜单栏
//     id: 111, // 唯一id
//     title: 'home', // 唯一title
//     transparent: true
//     // useContentSize: true, // 窗口透明
//   })
//   // 打开页面地址
//   mainWindow.loadURL(winURL)
//   // 关闭窗口回收变量
//   mainWindow.on('closed', () => {
//     mainWindow = null
//   })
//   // 引入newPage.js，负责悬浮窗口内主进程和渲染进程之间的通信
//   global.win1Id = mainWindow.id
//   console.log('mainWindow.id == ', mainWindow.id)
// }

// // 设置系统托盘
// function createTray () {
//   let iconPath = path.join(__static, 'icons/icon.png')
//   tray = new Tray(iconPath)
//   const contextMenu = Menu.buildFromTemplate([
//     {
//       label: '选择文件夹', type: 'normal', click: onChooseFolderClick
//     },
//     {label: '退出', type: 'normal', role: 'quit'}
//   ])
//   contextMenu.items[1].checked = false
//   tray.setContextMenu(contextMenu)
//   tray.setToolTip('vue-temp-electron-tip') // 鼠标hover提示
// }
// // 点击选择文件夹
// function onChooseFolderClick () {
//   const musicPaths = dialog.showOpenDialog({
//     properties: ['openDirectory']
//   })
//   // console.log('musicPaths - 1 == ', musicPaths)
//   if (musicPaths !== null && musicPaths !== 'undefined') {
//     sendMusicList(musicPaths)
//   }
// }
// // 查找音乐文件列表
// function sendMusicList (musicPaths) {
//   // console.log(' musicPaths - 2 == ', musicPaths)
//   if (mainWindow) {
//     store.set('MUSIC_PATHS', musicPaths)
//     musicPaths.forEach((filePath) => {
//       console.log('global.newPage2Window == ', global.newPage2Window)
//       if (fs.existsSync(filePath)) { // 路径是否存在
//         let fileNames = fs.readdirSync(filePath) // 返回给定目录的所有文件名或对象
//         // console.log('fileNames == ', fileNames)
//         fileNames = fileNames.filter((fileName) => { // we just need .mp3 files
//           let fullPath = path.join(filePath, fileName)
//           try {
//             let stats = fs.statSync(fullPath)
//             // console.log('mp3 - ', stats.isFile(), path.extname(fullPath) === '.mp3')
//             return stats.isFile() && path.extname(fullPath) === '.mp3'
//           } catch (e) {
//           }
//         })
//         console.log('fileNames == ', fileNames)
//         if (fileNames.length <= 0) {
//           // mainWindow.webContents.send(IPC.SET_MUSIC_LIST, [])
//           // 通知渲染进程
//           global.newPage2Window.webContents.send('webContents-music-path', {path: 'null-music'})
//         } else {
//           // async.map(fileNames, (fileName, callback) => {
//           //   let fullPath = path.join(filePath, fileName)
//           //   // new jsmediatags.Reader(fullPath).setTagsToRead(['title', 'artist']).read({
//           //   //   onSuccess: ({tags}) => {
//           //   //     callback(null, {fileName, artist: tags.artist, title: tags.title})
//           //   //   }
//           //   // })
//           // }, (err, results) => {
//           //   console.log('err == ', err)
//           //   // mainWindow.webContents.send(IPC.SET_MUSIC_LIST, results)
//           // })
//           // 通知渲染进程
//           global.newPage2Window.webContents.send('webContents-music-path', {path: fileNames || 'null'})
//         }
//       } else {
//         // mainWindow.webContents.send(IPC.SET_MUSIC_LIST, [])
//         // 通知渲染进程
//         global.newPage2Window.webContents.send('webContents-music-path', {path: '路径不存在'})
//       }
//     })
//   }
// }

// // Main进程
// ipcMain.on('synchronous-message', (event, arg) => { // arg为接受到的消息
//   console.log('Main进程 - synchronous-message')
//   event.returnValue = 'pong' // 返回一个'pong'
// })

// ipcMain.on('asynchronous-message', (event, arg) => { // arg为接受到的消息
//   console.log('Main进程 - asynchronous-message')
//   event.sender.send('asynchronous-reply', 'asyncPong') // 返回一个'asyncPong'
// })

// app.on('ready', () => {
//   createTray()
//   // new MusicServer().start()
//   createWindow()

//   // Main进程
//   mainWindow.webContents.send('webContents-message', {msg: 'webContents-message'}) // mainWindow是一个BrowserWindow实例

//   global.newPage2Window = createNewPage2Window(BrowserWindow)
//   // console.log('global.newPage2Window == ', global.newPage2Window.getShow())
//   // const win2Id = remote.getGlobal('storage')
//   // console.log('createNewPage2Window == ', global.newPage2Window.remote.getCurrentWebContents().getProcessId())
//   // const win2Id = createNewPage2Window.global.win2Id
//   // console.log('win2Id == ', win2Id)
//   // mainWindow.webContents.send('distributeIds', {
//   //   win2Id: win2Id
//   // })
//   global.winIdObj = {}
//   ipcMain.on('win-id', (event, arg1, arg2) => { // arg为接受到的消息
//     console.log('win-id - arg1, arg2 == ', arg1, arg2)
//     global[arg1] = arg2
//     // event.returnValue = 'pong' // 返回一个'pong'
//   })
//   ipcMain.on('synchronous-openNewPage', (event, arg1, arg2) => { // arg为接受到的消息
//     console.log('synchronous-openNewPage', arg1, arg2)
//     global.newPage2Window.show()
//     event.returnValue = 'open' // 返回一个'pong'
//   })
//   ipcMain.on('asynchronous-closeNewPageWindow', (event, arg) => { // arg为接受到的消息
//     console.log('synchronous-closeNewPageWindow', arg)
//     global.newPage2Window.hide()
//     event.sender.send('asynchronous-reply', 'asyncPong') // 返回一个'asyncPong'
//   })
//   ipcMain.on('asynchronous-call-Three-kit', (event, arg) => { // arg为接受到的消息
//     console.log('asynchronous-call-Three-kit', arg)
//     mainWindow.webContents.send('webContents-call-Three-kit', arg)
//     event.sender.send('asynchronous-reply', arg) // 返回一个'asyncPong'
//   })
// })

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') { // 在macOS中手动退出
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

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

import { app, BrowserWindow } from 'electron'
// import glob from 'glob'

// import path from 'path'
// const path = require('path')
require('./components/menus/index.js') // 引入菜单文件并执行，但是node下怎么批量导入js文件并执行有问题，后期学习

let mainWindow = null

// function addScript (url) {
//   var script = document.createElement('script')
//   script.setAttribute('type', 'text/javascript')
//   script.setAttribute('src', url)
//   document.getElementsByTagName('head')[0].appendChild(script)
// }

// 在主进程目录中需要的每个 JS 文件，如菜单配置等
// function loadDemos () {
//   // node模块，加载系统本地文件
//   // console.log('__dirname == ', __dirname) // src/main
//   // console.log('path.__dirname == ', path.resolve(__dirname)) // src/main
//   const files = glob.sync(path.join('./', 'components/**/*.js'))
//   // files.forEach((file) => { require(file) })
//   files.forEach((file) => { addScript(file) })
//   console.log('files == ', files)
// }

function initialize () {
  // loadDemos()

  function createWindow () {
    const windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      title: app.getName(), // 窗口title，默认是Electron
      webPreferences: { // 设置界面特性
        nodeIntegration: true // 是否完整支持node. 默认为 false,渲染进程默认不支持
      }
    }
    mainWindow = new BrowserWindow(windowOptions) // 打开
    const winURL = process.env.NODE_ENV === 'development'
      ? `http://localhost:9080/`
      : `file://${__dirname}/index.html`
    // mainWindow.loadURL(path.join('file://', __dirname, '/index.html')) // 地址
    mainWindow.loadURL(winURL) // 地址

    mainWindow.on('closed', () => { // 窗口对象BrowserWindow的api
      mainWindow = null // 回收窗口
    })
  }

  app.on('ready', () => { // 完成初始化，触发一次
    createWindow()
  })

  app.on('window-all-closed', () => { // Cmd+Q或者直接调用app的quit事件，此事件不会触发
    if (process.platform !== 'darwin') { // macOS系统
      app.quit() // 应用退出时发出，但系统关机/重启、用户注销，此事件不会触发
    }
  })

  app.on('activate', () => { // 首次启动应用时、与其他应用窗口切换时等
    if (mainWindow === null) {
      createWindow()
    }
  })
}

initialize()

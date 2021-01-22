// import { LOAD_URL } from './../config'

// import {remote} from 'electron'
// const miniWinURL = process.env.NODE_ENV === 'development'
//   ? `http://localhost:9080/#mini`
//   : `${LOAD_URL}#mini`
const miniWinURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#new-page`
  : `file://${__dirname}/index.html`
const createNewPage2Window = function (BrowserWindow) {
  let obj = {
    height: 600,
    width: 1200,
    titleBarStyle: 'hidden-inset', // 窗口标题栏样式
    // frame: false, // 关闭菜单栏
    id: 222, // 唯一id
    title: 'newPage', // 唯一title
    movable: true // 窗口是否可以移动
    // transparent: true

    // height: 480,
    // width: 620,
    // minWidth: 320,
    // show: true,
    // frame: false,
    // fullscreenable: false,
    // skipTaskbar: true,
    // resizable: process.env.NODE_ENV === 'development',
    // transparent: process.platform !== 'linux',
    // alwaysOnTop: true,
    // webPreferences: {
    //   devTools: false, // false关闭调试工具
    //   nodeIntegration: true,
    //   nodeIntegrationInWorker: true,
    //   backgroundThrottling: false,
    //   webSecurity: false
    // }
  }

  let miniWindow = new BrowserWindow(obj)

  miniWindow.loadURL(miniWinURL)
  // global.win2Id = remote.getCurrentWebContents().getProcessId()
  // console.log('new Page - win2Id == ', global.win2Id)
  miniWindow.on('closed', () => {
    miniWindow = null
  })

  return miniWindow
}
export default createNewPage2Window

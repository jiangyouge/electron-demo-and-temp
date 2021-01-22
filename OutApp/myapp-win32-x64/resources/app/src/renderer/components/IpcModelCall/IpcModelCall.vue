<template>
  <div class="ipc-centent">
    <div class="title">ipcModelCall</div>
    <div class="btn" @click=syncSendClick()>发送同步消息</div>
    <div class="btn" @click=asyncSendClick()>发送异步消息</div>
    <div class="btn" @click=openNewWindow()>打开新窗口</div>
    <div class="btn" @click=logRemoteMsg()>打印remote模块得到的主线程的信息</div>
    <!-- <div class="btn" @click=sendToOtherRender()>与其他渲染进程通信</div> -->
  </div>
</template>

<script>
// Renderer进程
import {ipcRenderer, remote} from 'electron'
// import Vue from 'vue'

const allWindows = remote.BrowserWindow.getAllWindows()
export default {
  data () {
    return {
      electron: process.versions.electron,
      name: this.$route.name,
      node: process.versions.node,
      path: this.$route.path,
      platform: require('os').platform(),
      vue: require('vue/package.json').version
    }
  },
  methods: {
    syncSendClick () {
      console.log('syncSendClick')
      let message = ipcRenderer.sendSync('synchronous-message', 'syncPing') // 给主进程发送明为synchronous-message的消息“syncPing”
      console.log('message == ', message) // 主线程同步传回修改后的值
    },
    asyncSendClick () {
      console.log('asyncSendClick')
      ipcRenderer.send('asynchronous-message', 'asyncPing') // 给主进程发送名为asynchronous-message的消息“asyncPing”
    },
    openNewWindow () {
      const { BrowserWindow } = require('electron').remote
      let win = new BrowserWindow({ width: 800, height: 600, id: 'webContentsId2' })
      win.loadURL('https://github.com')
      // 注意的是，这里的BrowserWindow和win都是远程对象，渲染进程在这里并没有创建BrowserWindow
      // 对象，而是发送同步信息，让主线程创建BrowserWindow对象，并且返回相应的远程对象win，
      // 但是，这里主线程收到消息后的回调是异步函数
      // 另外，这里的对象不会主动销毁，所有应注意回收
    },
    logRemoteMsg () {
      const path = remote.require('path')
      console.log('remote.require(module[String]) - path == ', path)

      const getCurrentWindow = remote.getCurrentWindow()
      console.log('remote.getCurrentWindow() - getCurrentWindow == ', getCurrentWindow)

      const getCurrentWebContents = remote.getCurrentWebContents()
      console.log('remote.getCurrentWebContents() - getCurrentWebContents == ', getCurrentWebContents)

      const storage = remote.getGlobal('storage')
      console.log('remote.getGlobal(name[String]) - storage == ', storage)
    },
    sendToOtherRender () {
      // ipcRenderer.sendTo(webContentsId, channel, [, arg1][, arg2][, ...])
      // webContentsId： 窗口唯一id，可使用global.mainWindow = {id: mainWindow.id}等方式赋值
      // channel：通信事件名
      // args： 参数

      // const app = require('electron').remote.app
      // console.log(remote.getCurrentWebContents().getProcessId())
      console.log('allWindows == ', allWindows)
      console.log('remote.getGlobal()', remote.getGlobal('win2'), remote.getGlobal('win1'))
      // ipcRenderer.sendTo(remote.getGlobal('win2'), 'sendToPing', 'argsString')
      ipcRenderer.sendTo(1, 'sendToPing', 'argsString')
    }
  },
  mounted () {
    ipcRenderer.on('synchronous-message', (event, arg) => { // 接收到Main进程返回的synchronous-reply消息
      console.log(`同步消息回复: ${arg}`)
    })

    ipcRenderer.on('asynchronous-reply', (event, arg) => { // 接收到Main进程返回的名为asynchronous-reply的消息
      console.log(`异步消息回复: ${arg}`)
    })

    ipcRenderer.on('webContents-message', (e, msg) => {
      console.log('webContents.send方法监听回调', msg)
    })

    const app = require('electron').remote.app
    console.log('app', app)

    ipcRenderer.send('win-id', 'win1', remote.getCurrentWebContents().getProcessId())
  }
}
</script>

<style scoped>
  .ipc-centent {
    -webkit-app-region: no-drag;
  }
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>

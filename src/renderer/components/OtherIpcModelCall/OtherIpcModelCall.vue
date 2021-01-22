<template>
  <div class="ipc-centent">
    <div class="title">OtherIpcModelCall</div>
    <div class="section" @click="closeWindow">关闭本窗口</div>
    <div class="section" v-if="musicPath">{{musicPath}}</div>
    <div class="section" v-if="callMsg">{{callMsg}}</div>
    <div class="section" @click=callThreeKit()>呼叫三娃儿</div>
    <div class="section" @click=closeCall()>挂机</div>
  </div>
</template>

<script>
// Renderer进程
import {ipcRenderer} from 'electron'
// import Vue from 'vue'

export default {
  data () {
    return {
      electron: process.versions.electron,
      name: this.$route.name,
      node: process.versions.node,
      path: this.$route.path,
      platform: require('os').platform(),
      vue: require('vue/package.json').version,
      musicPath: '',
      callMsg: ''
    }
  },
  methods: {
    closeWindow () {
      console.log('closeWindow')
      ipcRenderer.send('asynchronous-closeNewPageWindow', 'asyncPing')
    },
    callThreeKit () {
      // remote.getGlobal('newPage2Window').webContents.send('webContents-call-Three-kit', {msg: '三娃儿在的'})
      ipcRenderer.send('asynchronous-call-Three-kit', {msg: '三娃儿在的'})
    },
    closeCall () {
      this.callMsg = ''
    }
  },
  mounted () {
    ipcRenderer.on('webContents-music-path', (e, msg = {path: ''}) => {
      console.log('选中文件夹内mp3地址 == ', msg.path)
      this.musicPath = msg.path
    })
    ipcRenderer.on('webContents-call-Two-dog', (e, msg = {msg: ''}) => {
      console.log('webContents-call-Two-dog - call == ', msg.msg)
      this.callMsg = msg.msg
    })
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
    padding: 8px;
  }

  .section {
    padding: 8px;
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

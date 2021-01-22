<template>
  <div class="ipc-centent">
    <div class="title">OtherIpcModelCall</div>
  </div>
</template>

<script>
// Renderer进程
// import {ipcRenderer, remote} from 'electron'
// import Vue from 'vue'

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

  },
  mounted () {

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

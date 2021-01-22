<!-- Created By liuhuihao 2018/5/23 11:54  -->
<template>
    <div class="main-page">
      <h3>this is newPageDemo2</h3>
      <other-ipc-model-call></other-ipc-model-call>
    </div>
</template>

<script>
// import {musicProgress, musicName, musicInfo, musicControl, musicAudio, musicCanvas} from '@/components'
import {ipcRenderer, remote} from 'electron'
import {OtherIpcModelCall} from '@/components'

export default {
  name: 'mainPage',
  components: {
    // musicProgress, musicName, musicInfo, musicControl, musicAudio, musicCanvas
    OtherIpcModelCall
  },
  mounted () {
    console.log('OtherIpcModelCall == ', OtherIpcModelCall)
    console.log(remote.getCurrentWebContents().getProcessId())
    ipcRenderer.on('sendToPing', (e, msg) => {
      console.log('sendTo方法监听回调', msg)
    })

    ipcRenderer.send('win-id', 'win2', remote.getCurrentWebContents().getProcessId())
  }
}
</script>

<style lang="less" scoped>
    .main-page {
        width: 100vw;
        height: 100vh;
        /*background: gray;*/
        -webkit-app-region: drag;

        h3 {
          padding: 8px;
        }

        .music-name-container, .music-progress-container, .music-info-container, .music-control-container {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
        }

        .music-name-container {
            top: 220px;
            width: 100%;
            text-align: center;
        }

        .music-progress-container {
            top: 290px;
        }

        .music-info-container {
            top: 316px;
        }

        .music-control-container {
            top: 356px;
        }
    }
</style>
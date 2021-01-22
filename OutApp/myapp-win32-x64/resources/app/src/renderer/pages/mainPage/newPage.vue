<!-- Created By liuhuihao 2018/5/23 11:54  -->
<template>
    <div class="main-page">
      this is newPageDemo
      <other-ipc-model-call></other-ipc-model-call>
    </div>
</template>

<script>
// import {musicProgress, musicName, musicInfo, musicControl, musicAudio, musicCanvas} from '@/components'
import {OtherIpcModelCall} from '@/components'

export default {
  name: 'mainPage',
  components: {
    // musicProgress, musicName, musicInfo, musicControl, musicAudio, musicCanvas
    OtherIpcModelCall
  },
  mounted () {
    console.log('OtherIpcModelCall == ', OtherIpcModelCall)
  }
}
</script>

<style lang="less" scoped>
    .main-page {
        width: 100vw;
        height: 100vh;
        /*background: gray;*/
        -webkit-app-region: drag;

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
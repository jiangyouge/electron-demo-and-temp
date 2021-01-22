<template>
    <div class="main-page">
      <!-- <h3>this is demoPage</h3> -->
      <!-- <ipc-model-call></ipc-model-call> -->
      <nav-left @changeDoc="changeDoc"></nav-left>
      <main>
        <components
          :is="showMainDocName"
        ></components>
      </main>
    </div>
</template>

<script>
// import {musicProgress, musicName, musicInfo, musicControl, musicAudio, musicCanvas} from '@/components'
// import {IpcModelCall} from '@/components'
import {
  NavLeft,
  Windows,
  CrashHang,
  Menus,
  ShortCuts,
  ExLinksFileManager,
  Notifications,
  Dialogs,
  Tray
} from '@/components'

export default {
  name: 'mainPage',
  data () {
    return {
      showMainDocName: 'Windows'
    }
  },
  components: {
    // musicProgress, musicName, musicInfo, musicControl, musicAudio, musicCanvas
    // IpcModelCall,
    NavLeft,
    Windows,
    CrashHang,
    Menus,
    ShortCuts,
    ExLinksFileManager,
    Notifications,
    Dialogs,
    Tray
  },
  methods: {
    changeDoc (type = 'Windows') {
      console.log('out - type =====', type)
      this.showMainDocName = type
    }
  },
  mounted () {
    console.log('NavLeft == ', NavLeft)
  }
}
</script>

<style lang="less" scoped>
    .main-page {
      display: flex;
      align-items: center;
      justify-content: space-between;
        width: 100vw;
        height: 100vh;
        /*background: gray;*/
        -webkit-app-region: drag;

      main {
        height: 100%;
      }
        
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
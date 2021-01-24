<template>
    <div class="main-page">
      <!-- <h3>this is demoPage</h3> -->
      <!-- <ipc-model-call></ipc-model-call> -->
      <nav-left @changeDoc="changeDoc"></nav-left>
      <main>
        <components
          :is="showMainDocName"
          @openDocSection="openDocSection"
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
  Tray,
  Drag,
  Ipc,
  AppSysInformation,
  Clipboard,
  ProtocolHandler,
  Pdf,
  DesktopCapturer
} from '@/components'

// const settings = require('electron-settings')
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
    Tray,
    Drag,
    Ipc,
    AppSysInformation,
    Clipboard,
    ProtocolHandler,
    Pdf,
    DesktopCapturer
  },
  methods: {
    changeDoc (type = 'Windows') {
      console.log('out - type =====', type)
      this.showMainDocName = type
    },
    openDocSection () {
      console.log('out - openDocSection =====')
    }
  },
  mounted () {
    console.log('NavLeft == ', NavLeft)
    // const demoBtns = document.querySelectorAll('.js-container-target')
    // console.log('demoBtns == ', demoBtns)
    // Listen for demo button clicks
    // Array.prototype.forEach.call(demoBtns, (btn) => {
    //   console.log('btn == ', btn)
    //   btn.addEventListener('click', (event) => {
    //     console.log('event == ', event)
    //     const parent = event.target.parentElement

    //     // Toggles the "is-open" class on the demo's parent element.
    //     parent.classList.toggle('is-open')

    //     // Saves the active demo if it is open, or clears it if the demo was user
    //     // collapsed by the user
    //     if (parent.classList.contains('is-open')) {
    //       settings.set('activeDemoButtonId', event.target.getAttribute('id'))
    //     } else {
    //       settings.delete('activeDemoButtonId')
    //     }
    //   })
    // })

    // // Default to the demo that was active the last time the app was open
    // const buttonId = settings.get('activeDemoButtonId')
    // console.log('buttonId = ', buttonId)
    // if (buttonId) {
    //   document.getElementById(buttonId).click()
    // }
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
        flex: auto;
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
<template class="task-template">
  <section id="notifications-section" class="section js-section u-category-native-ui">
    <header class="notifications">
      <div class="section-wrapper">
        <h1>
          <svg class="section-icon"><use xlink:href="@/assets/img/icons.svg#icon-notification"></use></svg>
          桌面通知
        </h1>
        <h3>使用 Electron 中的 <code>notification</code> 模块可以允许你增加基本的桌面通知.</h3>

        <p>Electron 允许开发者使用 <a href="https://notifications.spec.whatwg.org/">HTML5 Notification API</a> 发送通知, 并使用当前操作系统的原生通知 API 来显示.</p>

        <p><b>注意:</b> 由于这是一个 HTML5 API, 它只能在渲染器进程中使用.</p>

        <p>在浏览器中查看 <a href="https://electron.atom.io/docs/all/#notifications-windows-linux-macos">在浏览器中查看<span class="u-visible-to-screen-reader">(在新窗口中打开)</span></a>.</p>
      </div>
    </header>

    <div class="demo">
      <div class="demo-wrapper" :class="openDocFlag ? 'is-open' : ''">
        <button id="basic-notification-demo-toggle" class="js-container-target demo-toggle-button" @click.stop="openDocSection">基本通知
          <div class="demo-meta u-avoid-clicks">支持: Win 7+, macOS, Linux (支持 libnotify)<span class="demo-meta-divider">|</span> 进程: Renderer</div>
        </button>
        <div class="demo-box">
          <div class="demo-controls">
            <button class="demo-button" id="basic-noti">查看示例</button>
          </div>
          <p>此示例演示了一个基本的通知. 只含有文字.</p>
          <h5>渲染器进程</h5>
          <!-- <pre><code data-path="renderer-process/native-ui/notifications/basic-notification.js"></pre></code> -->
        </div>
      </div>
    </div>

    <div class="demo">
      <div class="demo-wrapper" :class="openDocFlag ? 'is-open' : ''">
        <button id="advanced-notification-demo-toggle" class="js-container-target demo-toggle-button" @click.stop="openDocSection">基本通知
          <div class="demo-meta u-avoid-clicks">支持: Win 7+, macOS, Linux (支持 libnotify) <span class="demo-meta-divider">|</span> 进程: Renderer</div>
        </button>
        <div class="demo-box">
          <div class="demo-controls">
            <button class="demo-button" id="advanced-noti">查看示例</button>
          </div>
          <p>此示例演示了一个基本的通知. 同时含有文字和图像.</p>
          <h5>渲染器进程</h5>
          <!-- <pre><code data-path="renderer-process/native-ui/notifications/advanced-notification.js"></pre></code> -->
        </div>
      </div>
    </div>

    <!-- <script type="text/javascript">
      require('./renderer-process/native-ui/notifications/basic-notification')
      require('./renderer-process/native-ui/notifications/advanced-notification')
    </script> -->

  </section>
</template>



<script>

export default {
  name: 'Notifications',
  data () {
    return {
      openDocFlag: false
    }
  },
  methods: {
    openDocSection () {
      // console.log('in - openDocSection =====')
      // this.$emit('openDocSection')
      this.openDocFlag = !this.openDocFlag
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
    
</style>
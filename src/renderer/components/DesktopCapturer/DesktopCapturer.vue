<template class="task-template">
  <section id="desktop-capturer-section" class="section js-section u-category-media">
    <header class="section-header">
      <div class="section-wrapper">
        <h1>
          <svg class="section-icon"><use xlink:href="@/assets/img/icons.svg#icon-media"></use></svg>
          创建屏幕截图
        </h1>
        <h3>Electron 中的 <code>desktopCapturer</code> 模块可用于访问 Chromium 的 <code>getUserMedia</code> web API 中提供的任何媒体, 例如音频, 视频, 屏幕和窗口.</h3>

        <p>在浏览器中查看 <a href="http://electron.atom.io/docs/api/desktop-capturer">完整 API 文档<span class="u-visible-to-screen-reader">(在新窗口中打开)</span></a>.</p>
      </div>
    </header>

    <div class="demo">
      <div class="demo-wrapper" :class="openDocFlag ? 'is-open' : ''">
        <button id="print-pdf-demo-toggle" class="js-container-target demo-toggle-button" @click.stop="openDocSection">创建屏幕截图
          <div class="demo-meta u-avoid-clicks">支持: Win, macOS, Linux | 进程: Renderer</div>
        </button>
        <div class="demo-box">
          <div class="demo-controls">
            <button class="demo-button" id="screen-shot">查看示例</button>
            <span class="demo-response is-selectable" id="screenshot-path"></span>
          </div>
          <p>此示例使用 <code>desktopCapturer</code> 模块采集正在使用的屏幕, 并创建全屏幕截图.</p>
          <p>点击示例按钮将截取当前屏幕的截图, 并在默认查看器中打开它.</p>
          <h5>渲染器进程</h5>
          <pre><code data-path="renderer-process/media/desktop-capturer.js"></code></pre>
        </div>
      </div>
    </div>

    <!-- <script type="text/javascript">
      require('./renderer-process/media/desktop-capturer')
    </script> -->

  </section>
</template>

<script>

export default {
  name: 'DesktopCapturer',
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
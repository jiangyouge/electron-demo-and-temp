<template class="task-template">
  <section id="drag-section" class="section js-section u-category-native-ui">
    <header class="communication">
      <div class="section-wrapper">
        <h1>
          <svg class="section-icon"><use xlink:href="@/assets/img/icons.svg#icon-native-ui"></use></svg>
          拖放文件
        </h1>
        <h3>Electron 支持将文件和内容从 Web 拖放到操作系统中.</h3>

        <p>在浏览器中查看 <a href="https://electronjs.org/docs/tutorial/native-file-drag-drop">完整 API 文档<span class="u-visible-to-screen-reader">(在新窗口中打开)</span></a>.</p>
      </div>
    </header>

    <div class="demo">
      <div class="demo-wrapper" :class="openDocFlag ? 'is-open' : ''">
        <button id="dragging-demo-toggle" class="js-container-target demo-toggle-button" @click.stop="openDocSection">拖动文件
          <div class="demo-meta u-avoid-clicks">支持: Win, macOS, Linux <span class="demo-meta-divider">|</span> 进程: Both</div>
        </button>
        <div class="demo-box">
          <div class="demo-controls">
            <a href="#" id="drag-file-link">拖动示例</a>
          </div>
          <p>单击并拖动上面的链接，将渲染器进程 javascript 文件复制到您的计算机上。</p>

          <p>在这个示例中, <code>webContents.startDrag()</code> API 被调用以响应 <code>ondragstart</code> 事件.</p>
          <h5>渲染进程</h5>
          <pre><code data-path="renderer-process/native-ui/drag/drag.js"></code></pre>
          <h5>主进程</h5>
          <pre><code data-path="main-process/native-ui/drag/drag.js"></code></pre>
        </div>
      </div>
    </div>



    <!-- <script type="text/javascript">
      require('./renderer-process/native-ui/drag/drag')
    </script> -->

  </section>
</template>

<script>

export default {
  name: 'Drag',
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
<template>
  <nav class="nav js-nav">
    <header class="nav-header">
      <h1 class="nav-title">Electron <strong>API 示例</strong></h1>
      <svg class="nav-header-icon"><use xlink:href="@/assets/img/icons.svg#icon-electron"></use></svg>
    </header>

    <div class="nav-item u-category-windows">
      <h5 class="nav-category">
        <svg class="nav-icon"><use xlink:href="@/assets/img/icons.svg#icon-windows"></use></svg>
        窗体
      </h5>
      <button type="button" id="button-windows" data-section="windows" class="nav-button" @click.stop="changeDoc('Windows')">创建并管理 <em>窗体</em></button>
      <button type="button" id="button-crash-hang" data-section="crash-hang" class="nav-button" @click.stop="changeDoc('CrashHang')">处理窗体 <em>崩溃和挂起</em></button>
    </div>

    <div class="nav-item u-category-menu">
      <h5 class="nav-category">
        <svg class="nav-icon"><use xlink:href="@/assets/img/icons.svg#icon-menu"></use></svg>
        菜单
      </h5>
      <button type="button" id="button-menus" data-section="menus" class="nav-button" @click.stop="changeDoc('Menus')">自定义 <em>菜单</em> </button>
      <button type="button" id="button-shortcuts" data-section="shortcuts" class="nav-button" @click.stop="changeDoc('ShortCuts')">注册键盘 <em>快捷键</em></button>
    </div>

    <div class="nav-item u-category-native-ui">
      <h5 class="nav-category">
        <svg class="nav-icon"><use xlink:href="@/assets/img/icons.svg#icon-native-ui"></use></svg>
        本地用户界面</h5>
      <button type="button" id="button-ex-links-file-manager" data-section="ex-links-file-manager" class="nav-button" @click.stop="changeDoc('ExLinksFileManager')">打开 <em>外部链接</em> 或 系统 <em>文件管理器</em></button>
      <button type="button" id="button-notifications" data-section="notifications" class="nav-button" @click.stop="changeDoc('Notifications')">使用基本或附带图像的 <em>通知</em></button>
      <button type="button" id="button-dialogs" data-section="dialogs" class="nav-button" @click.stop="changeDoc('Dialogs')">使用系统 <em>对话框</em></button>
      <button type="button" id="button-tray" data-section="tray" class="nav-button" @click.stop="changeDoc('Tray')">将应用程序放入 <em>托盘</em></button>
      <button type="button" id="button-drag" data-section="drag" class="nav-button" @click.stop="changeDoc('Drag')"><em>拖放</em> 文件</button>
    </div>

    <div class="nav-item u-category-communication">
      <h5 class="nav-category">
        <svg class="nav-icon"><use xlink:href="@/assets/img/icons.svg#icon-communication"></use></svg>
        通信
      </h5>
      <button type="button" id="button-ipc" data-section="ipc" class="nav-button" @click.stop="changeDoc('Ipc')">在 <em>两个进程</em> 之间进行通信</button>
    </div>

    <div class="nav-item u-category-system">
      <h5 class="nav-category">
        <svg class="nav-icon"><use xlink:href="@/assets/img/icons.svg#icon-system"></use></svg>
        系统
      </h5>
      <button type="button" id="button-app-sys-information" data-section="app-sys-information" class="nav-button" @click.stop="changeDoc('AppSysInformation')" >获取应用或用户 <em>系统信息</em></button>
      <button type="button" id="button-clipboard" data-section="clipboard" class="nav-button" @click.stop="changeDoc('Clipboard')">从 <em>剪贴板</em> 复制和粘贴</button>
      <button type="button" id="button-protocol" data-section="protocol" class="nav-button" @click.stop="changeDoc('ProtocolHandler')">使用 <em>协议处理器</em> 启动应用程序</button>
    </div>

    <div class="nav-item u-category-media">
      <h5 class="nav-category">
        <svg class="nav-icon"><use xlink:href="@/assets/img/icons.svg#icon-media"></use></svg>
        媒体
      </h5>
      <button type="button" id="button-pdf" data-section="pdf" class="nav-button" @click.stop="changeDoc('Pdf')"><em>打印</em> 到 PDF</button>
      <button type="button" id="button-desktop-capturer" data-section="desktop-capturer" class="nav-button" @click.stop="changeDoc('DesktopCapturer')">创建 <em>屏幕截图</em></button>
    </div>

    <footer class="nav-footer">
      <button type="button" id="button-about" data-modal="about" class="nav-footer-button">关于</button>
      <a class="nav-footer-logo" href="https://github.com" aria-label="Homepage">
        <svg class="nav-footer-icon"><use xlink:href="@/assets/img/icons.svg#icon-love"></use></svg>
      </a>
    </footer>
  </nav>
</template>
<script>

export default {
  name: 'NavLeft',
  data () {
    return {

    }
  },
  methods: {
    // 切换右边Doc文档
    changeDoc (type = 'Windows') {
      console.log('in - type = ', type)
      this.$emit('changeDoc', type)
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
  /* Nav */

  .nav {
    flex: none;
    width: 340px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    color: var(--color-subtle);
    border-right: 1px solid var(--color-border);
    background-color: var(--color-bg);
    // visibility: hidden;
    // opacity: 0;
  }
  .nav.is-shown {
    visibility: visible;;
    opacity: 1;
  }

  .nav-header {
    position: relative;
    padding: 2rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  .nav-title {
    text-transform: uppercase;
    font-weight: 300;
    line-height: 1;
    margin: 0;
  }

  .nav-title strong {
    font-weight: 600;
    color: var(--color-strong);
  }

  .nav-header-icon {
    position: absolute;
    width: 36px;
    height: 36px;
    top: 1.5rem; /* magic */
    right: 1.75rem; /* magic */
  }



  .nav-item {
    padding: .5em 0;
  }

  .nav-icon {
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: .25rem;
  }

  .nav-category {
    margin: .2em 0;
    padding-left: 2rem;
    font-size: 11px;
    font-weight: normal;
    text-transform: uppercase;
  }

  .nav-button {
    display: block;
    width: 100%;
    padding: .3rem;
    padding-left: calc(2rem + 16px + .5rem); /* padding + icon + magic */
    line-height: 2;
    text-align: left;
    font: inherit;
    font-size: 13px;
    color: inherit;
    border: none;
    background-color: transparent;
    cursor: default;
    outline: none;
  }
  .nav-button:hover,
  .nav-button:focus:not(.is-selected) {
    background-color: hsla(0,0%,0%,.1);
  }
  .nav-button.is-selected {
    background-color: var(--color-accent);
  }
  .nav-button.is-selected,
  .nav-button.is-selected em {
    color: #fff;
  }
  .nav-button.is-selected:focus {
    opacity: .8;
  }

  .nav-button em {
    font-style: normal;
    font-weight: 600;
    color: var(--color-strong);
    pointer-events: none; /* makes it invisible to clicks */
  }

  .nav-footer {
    margin-top: 1rem;
    padding: 2rem;
    border-top: 1px solid var(--color-border);
    text-align: center;
  }

  .nav-footer-icon {
    width: calc(770px / 6.5);
    height: calc(88px / 6.5);
  }

  .nav-footer a {
    outline: none;
  }

  .nav-footer-button {
    display: block;
    width: 100%;
    padding: 0;
    margin-bottom: .75rem;
    line-height: 2;
    text-align: left;
    font: inherit;
    font-size: 13px;
    color: inherit;
    border: none;
    background-color: transparent;
    cursor: default;
    outline: none;
    text-align: center;
  }
  .nav-footer-button:focus {
    color: var(--color-strong);
  }

  .nav-footer-logo {
    color: hsl(0,0%,66%);
  }
  .nav-footer-logo:focus {
    color: hsl(0,0%,33%);
  }

  /* Remove border on the logo */
  .nav-footer-logo.nav-footer-logo {
    border-bottom: none;
  }

</style>
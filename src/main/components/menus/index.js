import { app, dialog, shell, Menu, BrowserWindow } from 'electron'

// 导航栏菜单模板
let template = [{
  label: '编辑',
  submenu: [{
    label: '撤销',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: '重做',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: '剪切',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: '复制',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: '粘贴',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: '全选',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: '查看',
  submenu: [{
    label: '重载',
    accelerator: 'CmdOrCtrl+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        // 重载之后, 刷新并关闭所有之前打开的次要窗体
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(win => { // 返回 BrowserWindow[] - 所有打开的窗口的数组
            if (win.id > 1) win.close() // 窗口的唯一ID，在整个Electron应用的所有实例中唯一，类型是Integer
            // 关闭窗口，与关闭按钮类似，所以可能会被取消：在beforeunload 和 unload中（建议使用window.onbeforeunload=fn()方式调用）
            // 若要阻止关闭，返回非空；若要关闭，使用e.returnValue = false而非使用return false
          })
        }
        focusedWindow.reload() // 窗口重新加载
      }
    }
  }, {
    label: '切换全屏',
    accelerator: (() => {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen()) // boolean，对应窗口是否全屏
      }
    }
  }, {
    label: '切换开发者工具',
    accelerator: (() => {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.toggleDevTools() // 切换开发者工具（即打开或关闭开发者工具）
      }
    }
  }, {
    type: 'separator'
  }, {
    label: '应用程序菜单演示',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          type: 'info',
          title: '应用程序菜单演示',
          buttons: ['好的'],
          message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
        }
        dialog.showMessageBox(focusedWindow, options, function () {}) // 提示框，会阻塞进程
      }
    }
  }]
}, {
  label: '窗口',
  role: 'window',
  submenu: [{
    label: '最小化',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: '关闭',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }, {
    label: '重新打开窗口',
    accelerator: 'CmdOrCtrl+Shift+T',
    enabled: false,
    key: 'reopenMenuItem',
    click: () => {
      app.emit('activate') // 调用app的生命周期里的activate
    }
  }]
}, {
  label: '帮助',
  role: 'help',
  submenu: [{
    label: '学习更多',
    click: () => {
      // shell 模块 提供与桌面集成相关的功能
      // openExternal使用用户默认浏览器打开指定url
      shell.openExternal('http://electron.atom.io')
    }
  }]
}]

app.on('ready', () => {
  // menu 创建原生应用菜单和上下文菜单
  const menu = Menu.buildFromTemplate(template) // 依照template构建menuItem
  Menu.setApplicationMenu(menu) // 把构建的menuItem设置成应用菜单，win和linux为窗口顶部菜单，macOS为应用内菜单
})

# NW.js和electron

# 环境搭建
- nodejs安装
- electron 安装，`npm install -g electron`

# [electron文档](https://www.electronjs.org/)

# 快速创建electron项目
- git clone https://github.com/electron/electron-quick-start
- cd electron-quick-start
- npm i
- npm start
- 或者
- npx create-electron-app my-app

# main.js主进程，index.html是渲染进程

# 使用 electronforge 搭建一个项目
- node10版本
- 本机需要安装git

# 手动搭建一个electron项目
- index.html
- main.js
- package.json 指定main字段
```js
// main.js
const { app, BrowserWindow } = require('electron')
const path = require('path')

// 监听应用的启动事件
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    })
    mainWindow.loadFile(path.join(__dirname, 'index.html'))
})
```
- 通过 `electron .` 运行项目

# npx

# loadURL 加载远程地址，loadFile 加载本地文件

# 退出应用，macOS和Windows不一样
- 监听窗口关闭的事件，关闭的时候退出应用，macOS需要排除，因为macOS点击应用的右上角的close按钮，不会关闭应用，而是会最小化应用
```js
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// macOS中点击dock中的应用图标的时候需要重新创建窗口
app.on('activate', () => {
    // 所有的窗口都隐藏了
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
```

# 如何再项目中集成eslint
- 先全局安装 eslint，`npm install -g eslint`
- 到项目中 执行 eslint --init

# 主进程和渲染进程
- package.json中定义的入口被称为主进程
- 主进程中无需任何配置就可以使用nodejs中的模块

# 渲染进程使用nodejs模块
- electron5.x之前可以直接使用，5.x之后需要配置
- 通过preload
- 主进程中进行配置
```js
// 主进程中进行配置
nodeIntegration: true, // 允许渲染进程使用nodejs
contextIsolation: false
```

# 默认打开调试模式，`mainWindow.webContents.openDevTools()`

# 调用h5的拖放api 结合nodejs fs实现拖放打开文件功能

# BrowserWindow 进程其实可以看做一个浏览器
```js
// 阻止默认事件
showBox.ondragenter = showBox.ondragover = showBox.ondragleave = () => {
    return false
}
// 拖动过程中，释放鼠标时触发
showBox.ondrop = (e) => {
    // e.dataTransfer.files 拖拽多个文件时可以获取到，取[0]获取到单个
    fs.readFile(e.dataTransfer.files[0].path, (err, data) => {
        if (err) {
            throw err
        }
        // data 是二进制数据
        showBox.innerHTML = data.toString()
    })
}
```

# h5拖拽api

# electron中的模块
- 主进程中可以使用的模块
- 渲染进程中可以使用的模块
- 既可以再主进程中使用又可以在渲染进程中使用的模块

# remote模块
- 安装 `npm install @electron/remote --save`
- 主进程中启用remote模块
```js
const remote = require('@electron/remote/main')
remote.initialize()
// 启用remote模块
remote.enable(mainWindow.webContents)
```

# electron网页安全策略 CSP：content security policy
- 加载远程文件，可能会有安全问题

# [electron自定义顶部菜单](https://www.electronjs.org/zh/docs/latest/api/menu-item#%E8%8F%9C%E5%8D%95%E9%A1%B9)
- 写在主进程

# electron自定义右键菜单
- 再渲染进程监听右键点击事件
```js
const remote = require('@electron/remote')
const Menu = remote.Menu

let menuContextTemplate = [
    {
        label: '复制',
        role: 'copy'
    },
    {
        label: '粘贴',
        role: 'paste'
    },
    {
        type: 'separator'
    },
    {
        label: '其他功能',
        click: () => {
            console.log('自定义功能');
        }
    }
]
let menuContextBuiler = Menu.buildFromTemplate(menuContextTemplate)

window.onload = () => {
    // 监听右键点击事件
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        menuContextBuiler.popup({
            window: remote.getCurrentWindow()
        })
    })
}
```

# 一个渲染进程给另外一个渲染进程传值可以通过localStorage实现

# electron shell模块，再用户浏览器中打开URL

# webview

# 主进程直接给渲染进程发消息
- `BrowserWindow.getFocusedWindow.webContents.send('')`
- 渲染进程使用 ipcRenderer.on 监听

# 使用electron-forge创建项目
- npm install -g @electron-forge/cli
- electron-forge init my-new-app
- cd my-new-app
- npm start

# 通过nodemon热加载electron项目
- npm install nodemon
- 也可以全局安装 npm install -g nodemon
- nodemon默认只能监视js、mjs等，不过我们可以通过 -e去指定监视文件的类型
```json
"scripts": {
    "dev": "nodemon -e html,js,css --watch src --exec \"electron .\"",
    // 配置只监视主进程目录
    "start": "nodemon --watch src/main --exec \"electron .\""
}
```

# 不管是logout退出还是点击x按钮退出，都会被 close 事件监听到

# 实现双击复制：剪切板，两个进程都可以使用

# ---------------------------------------

# electron-vue 项目搭建
- npm install -g vue-cli
- vue init simulatedgreg/electron-vue electron-vue-project

# nedb数据库
- 本地数据库
- cnpm install nedb
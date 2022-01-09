const { app, BrowserWindow } = require('electron')
const path = require('path')
const remote = require('@electron/remote/main')
remote.initialize()

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'renderer/preload.js'),
            nodeIntegration: true, // 允许渲染进程使用nodejs
            contextIsolation: false
        }
    })
    mainWindow.loadFile(path.join(__dirname, 'index.html'))
    // 默认打开调试模式
    mainWindow.webContents.openDevTools()
    // 启用remote模块
    remote.enable(mainWindow.webContents)
    // 自定义顶部菜单
    // require('./ipcMain/menu')

}
// 监听应用的启动事件
app.on('ready', () => {
    createWindow()    
})

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
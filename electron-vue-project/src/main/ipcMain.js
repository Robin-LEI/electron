const { BrowserWindow, ipcMain, BrowserView } = require('electron')

// 获取当前窗口对象
const rl_mainWindow = BrowserWindow.getFocusedWindow()

// 监听窗口最小化事件
ipcMain.on('window-min', () => {
    rl_mainWindow.minimize()
})

// 监听窗口最大化事件
ipcMain.on('window-max', () => {
    if (rl_mainWindow.isMaximized()) {
        // 已经是最大化了，恢复原样
        rl_mainWindow.restore()
    } else {
        rl_mainWindow.maximize()
    }
})

// 监听窗口close，点击右上角X
ipcMain.on('window-close', () => {
    rl_mainWindow.close()
})
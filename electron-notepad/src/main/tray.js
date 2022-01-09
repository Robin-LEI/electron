/**
 * 系统托盘
 */

const { Tray, Menu, BrowserWindow, app } = require('electron')
const path = require('path')
// 创建系统托盘
trayIcon = new Tray(path.join(__dirname, '../static/favicon.ico'))

let contextMenu = Menu.buildFromTemplate([
    {
        label: '系统设置',
        click: () => {
            console.log('系统设置')
        }
    },
    {
        label: '更新',
        click: () => {
            console.log('更新')
        }
    },
    {
        label: '退出',
        click: () => {
            if (process.platform === 'darwin') {
                app.exit()
            } else {
                app.quit()
            }
        }
    }
])
// 鼠标放上去的提示信息
trayIcon.setToolTip('Notepad')
trayIcon.setContextMenu(contextMenu)

// 点击右上角x按钮隐藏到任务栏
let win = BrowserWindow.getFocusedWindow()
win.on('close', (e) => {
    // 阻止默认的行为--窗口关闭
    if (win.isFocused()) { // 判断窗口是否处于聚焦状态(是否显示)
        e.preventDefault()
        win.hide()
    } else {
        // 执行真正的退出
        win = null
    }
})

// 监听托盘双击事件
trayIcon.on('double-click', () => {
    win.show()
})

// 实现闪烁图标
// let count = 1
// let timer = setInterval(() => {
//     count++
//     if (count % 2 === 0) {
//         trayIcon.setImage(path.join(__dirname, '../static/empty.ico'))
//     } else {
//         trayIcon.setImage(path.join(__dirname, '../static/favicon2.ico'))
//     }
// }, 500)

const { Menu, shell, ipcMain, BrowserWindow } = require('electron')

// 判断操作系统的类型
// const isMac = process.platform === 'darwin'

const menuTemplate = [
    {
        label: '文件',
        submenu: [
            {
                label: '新建',
                accelerator: 'ctrl+n',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'new')
                }

            },
            {
                label: '打开',
                accelerator: 'ctrl+o',
                click: function () {
                    // 主进程和渲染进程发送消息，调用dialog打开弹窗
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'open')
                }
            },

            {
                label: '保存',
                accelerator: 'ctrl+s',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'save')
                }
            },
            {
                type: 'separator'
            },

            {
                label: '打印',
                accelerator: 'ctrl+p',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.print()
                }
            },
            {
                label: '退出',
                click: () => {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'close')
                }
                // role: isMac ? "close" : "quit"
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '查找',
                accelerator: 'ctrl+f',
                click: () => {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'find')
                }
            },
            {
                label: '撤销',
                role: 'undo'
            },
            {
                label: '恢复',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: '截切',
                role: 'cut'
            },
            {
                label: '复制',
                role: 'copy'
            },
            {
                label: '黏贴',
                role: 'paste'
            },

            {
                label: '删除',
                role: 'delete'
            },
            {
                label: '全选',
                role: 'selectall'
            }
        ]
    },
    {
        label: '视图',
        submenu: [
            {
                label: '重新加载',
                role: 'reload'
            },
            {
                label: '缩小',
                role: 'zoomout'
            },
            {
                label: '放大',
                role: 'zoomin'
            },
            {
                label: '重置缩放',
                role: 'resetzoom'
            },
            {
                type: 'separator'
            },
            {
                label: '全屏',
                role: 'togglefullscreen'
            }
        ]
    },
    {
        label: '帮助',
        submenu: [
            {
                label: '关于',
                click() {
                    shell.openExternal('https://www.itying.com');
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

// 创建右键菜单
const contextMenuTemplate = [
    {
        label: '撤销',
        role: 'undo'
    },
    {
        label: '恢复',
        role: 'redo'
    },
    {
        type: 'separator'
    },
    {
        label: '截切',
        role: 'cut'
    },
    {
        label: '复制',
        role: 'copy'
    },
    {
        label: '黏贴',
        role: 'paste'
    },
    { type: 'separator' },  //分隔线
    {
        label: '全选',
        role: 'selectall'
    }
]

const contextMenu = Menu.buildFromTemplate(contextMenuTemplate)
// 监听渲染进程发来的信息
ipcMain.on('showContextMenu', () => {
    contextMenu.popup({
        // 获取当前窗口，保证再当前窗口展示
        window: BrowserWindow.getFocusedWindow()
    })
})
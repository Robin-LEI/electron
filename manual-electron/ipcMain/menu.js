// https://www.electronjs.org/zh/docs/latest/api/menu-item#%E8%8F%9C%E5%8D%95%E9%A1%B9
const { Menu } = require('electron')

// 创建菜单模板
let menuTemplate = [
    {
        label: '文件',
        submenu: [
            {
                label: '新建',
                // 定义快捷键
                accelerator: 'ctrl+n',
                click: () => {
                    console.log('点击了新建事件');
                }
            },
            // 分隔符
            {
                type: 'separator'
            },
            {
                label: '打开'
            },
            {
                label: '保存'
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '复制',
                // 定义角色
                role: 'copy'
            },
            {
                label: '粘贴',
                role: 'paste'
            }
        ]
    }
]

let menuBuiler = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menuBuiler)


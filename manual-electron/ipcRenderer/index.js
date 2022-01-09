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
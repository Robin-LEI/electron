/**
 * 注册全局快捷键
 */
const { globalShortcut, app } = require('electron')

app.on('ready', () => {
    // 注册
    globalShortcut.register('ctrl+e', () => {
        console.log('点击了ctrl+e');
    })
    // 检测是否注册成功
    console.log(globalShortcut.isRegistered('ctrl+e'));
})

app.on('will-quit', () => {
    // 销毁快捷键
    globalShortcut.unregister('ctrl+e')
})
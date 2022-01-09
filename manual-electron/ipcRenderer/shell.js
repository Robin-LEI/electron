
// shell 都可以使用
const { shell } = require('electron')

window.onload = () => {
    let alist = document.querySelectorAll('a')
    for (let i = 0; i < alist.length; i++) {
        alist[i].onclick = function (e) {
            e.preventDefault()
            // shell.openExternal(this.getAttribute('href'))
            // shell模块还可以打开本地资源管理器
            shell.showItemInFolder('D:\\BaiduNetdiskDownload\\Electron+Vue跨平台桌面软件开发视频教程（IT营大地）- 赞助\\01 Electron+Vue视频教程【42讲】')
        }
    }
}
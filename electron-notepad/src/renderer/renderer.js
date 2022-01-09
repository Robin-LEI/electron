const { ipcRenderer } = require('electron')
const remote = require('@electron/remote')
const { FindInPage } = require('electron-find')
const { dialog, app } = remote
const fs = require('fs')
const path = require('path')

let isSaved = true // 判断文件有没有保存
let currentFileDir = ''
const isMac = process.platform === 'darwin'

window.onload = () => {
    // 监听右键事件
    window.addEventListener('contextmenu', () => {
        // 渲染进程发送消息给主进程，通知主进程打开右键菜单窗口
        ipcRenderer.send('showContextMenu')
    })

    textarea.focus()

    // 给文本框绑定oninput监听事件
    textarea.addEventListener('input', () => {
        if (isSaved) {
            document.title = '* ' + document.title
        }
        isSaved = false
    })

    // 渲染进程监听来自主进程发送来的消息
    ipcRenderer.on('action', (event, action) => {
        switch (action) {
            case 'new':
                // 先要判断用户是否有要保存的文件
                isShowSaveBox()
                // 新建的时候，清空文本框
                editor.setValue('')
                break
            case 'open':
                isShowSaveBox()
                const openFile = dialog.showOpenDialogSync({
                    title: '打开文件',
                    properties: ['openFile'],
                    filters: [
                        { name: '文本文件', extensions: ['txt'] },
                        { name: '前端代码', extensions: ['html', 'css', 'js', 'json', 'vue', 'jsx'] },
                        { name: '所有文件', extensions: ['*'] }
                    ]
                })
                // 说明点击了弹窗的取消按钮
                if (!openFile) return
                // 调用fs模块读取文件内容，展示在textarea上
                const fileContent = fs.readFileSync(openFile[0])
                editor.setValue(fileContent.toString())
                currentFileDir = openFile[0]
                document.title = openFile[0]
                break
            case 'save':
                saveCurrentFIle()
                break
            case 'find':
                let findInPage = new FindInPage(remote.getCurrentWebContents(), {
                    duration: 200
                })
                findInPage.openFindWindow()
                break
            case 'close':
                isShowSaveBox()
                isMac ? app.close() : app.quit()
                break
            default:
                break
        }
    })

    function isShowSaveBox() {
        if (!isSaved) {
            let index = dialog.showMessageBoxSync({
                type: 'question',
                message: '是否要保存此文件?',
                buttons: ['Yes', 'No']
            })
            if (index === 0) {
                // 调用保存文件的方法
                saveCurrentFIle()
            } else {
                isSaved = true
                document.title = document.title.replace(/[\* ]/g, '')
            }
        }
    }

    function saveCurrentFIle() {
        if (currentFileDir === '') { // 如果没有值，说明没有被保存过
            const saveFile = dialog.showSaveDialogSync({
                title: '保存文件',
                defaultPath: '新建文件.txt',
                filters: [
                    { name: '文本文件', extensions: ['txt'] },
                    { name: '前端代码', extensions: ['html', 'css', 'js', 'json', 'vue', 'jsx'] },
                    { name: '所有文件', extensions: ['*'] }
                ]
            })
            if (!saveFile) return
            currentFileDir = saveFile
            isSaved = true
            document.title = currentFileDir
            fs.writeFileSync(saveFile, editor.getValue())
        } else {
            fs.writeFileSync(currentFileDir, editor.getValue())
            isSaved = true
            document.title = currentFileDir
        }
    }

    // 消息通知 借助 h5
    /*
    let notiOption = {
        title: 'electron 通知api',
        body: 'electron 版本更新了，请升级下载最新版本',
        icon: path.join(__dirname, 'static/favicon.ico')
    }
    let myNoti = new window.Notification(notiOption.title, notiOption)
    myNoti.onclick = () => {
        console.log('myNoti')
    }
    */

    // 监听网络变化
    // 比如没有网了，给出用户提示，展示指定内容
    window.addEventListener('online', () => {
        console.log('有网络了');
    })
    window.addEventListener('offline', () => {
        console.log('网络离线了');
    })
}

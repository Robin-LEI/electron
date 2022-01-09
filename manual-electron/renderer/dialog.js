const remote = require('@electron/remote')
window.onload = () => {
    // 点击显示错误提示框
    errTipBtn.addEventListener('click', () => {
        remote.dialog.showErrorBox('错误标题', '错误内容')
    })

    // 点击显示消息提示框
    showMessageBox.addEventListener('click', () => {
        remote.dialog.showMessageBox({
            type: 'info', // none | info | error | question | ...
            buttons: ['ok', 'no'], // 确定|取消
            title: '关于我们',
            message: `
                版本: 1.63.2 (user setup)
                提交: 899d46d82c4c95423fb7e10e68eba52050e30ba3
                日期: 2021-12-15T09:40:02.816Z
                Electron: 13.5.2
                Chromium: 91.0.4472.164
                Node.js: 14.16.0
                V8: 9.1.269.39-electron.0
                OS: Windows_NT x64 10.0.19043
            `
        }).then(res => {
            console.log(res);
        })
    })

    // 点击显示对话框
    showOpenDialog.addEventListener('click', () => {
        remote.dialog.showOpenDialog({
            title: '打开文件',
            properties: ['openDirectory', 'multiSelections'] // 可以打开目录也可以打开文件
        }).then(res => {
            console.log(res);
        })
    })

    // 点击显示保存对话框
    showSaveDialog.addEventListener('click', () => {
        remote.dialog.showSaveDialog({
            title: '保存文件',
            defaultPath: 'x.txt',
            filters: [
                {name: 'Images', extensions: ['jpg', 'png', 'jif']},
                {name: 'Movies', extensions: ['mkv', 'avi']},
                {name: 'Custom File Type', extensions: ['as']},
                {name: 'All Files', extensions: ['*']}
            ]
        }).then(res => {
            console.log(res);
        })
    })
}
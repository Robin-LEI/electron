const fs = require('fs')

window.onload = () => {
    btn.addEventListener('click', () => {
        fs.readFile('package.json', (err, data) => {
            if (err) {
                return console.log(err)
            }
            showBox.innerHTML = data.toString()
        })
    })

    // 阻止默认事件
    showBox.ondragenter = showBox.ondragover = showBox.ondragleave = () => {
        return false
    }
    // 拖动过程中，释放鼠标时触发
    showBox.ondrop = (e) => {
        // e.dataTransfer.files 拖拽多个文件时可以获取到，取[0]获取到单个
        fs.readFile(e.dataTransfer.files[0].path, (err, data) => {
            if (err) {
                throw err
            }
            // data 是二进制数据
            showBox.innerHTML = data.toString()
        })
    }

    newWindow.addEventListener('click', () => {
        console.log('newWindow');
    })
}
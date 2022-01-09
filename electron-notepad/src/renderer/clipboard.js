/**
 * 剪切板
 */
const { clipboard, nativeImage } = require('electron')

// 执行复制操作
clipboard.writeText('测试是否复制')
// 获取复制的内容
console.log(clipboard.readText());

// 点击按钮复制图片
btnImage.addEventListener('click', () => {
    let image = nativeImage.createFromPath('static/20.png')
    // 复制图片
    clipboard.writeImage(image)
    let img = clipboard.readImage().toDataURL() // img是base64地址
    // 显示再页面上
    let imgDOM = new Image()
    imgDOM.src = img
    document.body.appendChild(imgDOM)
})
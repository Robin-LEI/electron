import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

export default new Datastore({
    autoload: true,
    // 指定数据库文件路径 appData roaming
    filename: path.join(remote.app.getPath('userData'), '/data.db')
})
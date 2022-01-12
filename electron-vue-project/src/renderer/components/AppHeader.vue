<template>
  <div id="app-header">
      <div class="rl_btn-group">
          <span @click="onBtn('min')">
              <i class="el-icon-minus"></i>
          </span>
          <span @click="onBtn('max')" class="max">
              <i class="el-icon-copy-document"></i>
          </span>
          <span @click="onBtn('close')">
              <i class="el-icon-close"></i>
          </span>
      </div>
      
  </div>
</template>

<script>
export default {
    name: 'AppHeader',
    methods: {
        onBtn (type) {
            switch (type) {
                case 'min':
                    this.$electron.ipcRenderer.send('window-min')
                    break
                case 'max':
                    this.$electron.ipcRenderer.send('window-max')
                    break
                case 'close':
                    this.$electron.ipcRenderer.send('window-close')
                    break
                default:
                    break
            }
        }
    }
}
</script>

<style>
#app-header {
    height: 60px;
    display: flex;
    color: #333;
    justify-content: flex-end;
    border-bottom: 1px solid #eee;
    align-items: center;
}
.rl_btn-group span:nth-child(2) {
    margin: 0 20px;
}
.rl_btn-group span:last-child {
    margin-right: 10px;
}
</style>
const fs = require('fs')

fs.readFile('package.json', (err, data) => {
    if (err) {
        return console.log(err)
    }
    console.log(data.toString())
})

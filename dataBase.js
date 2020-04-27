const {
    readFile
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile)
//const dataJson = require('./times.json')

class DataBase {
    
    constructor(){
        this.NAME_ARCHIVE = 'times.json'
    }

    async getArchive(){
        const archive = await readFileAsync(this.NAME_ARCHIVE, 'utf8')
        return JSON.parse(archive.toString())        
    }

    writeArchive(){

    }

    async list(id){
        const data = await this.getArchive()
        const dataFilter = data.filter(item => (id ? (item.id = id) : true))
        return dataFilter
    }
}

module.exports = new DataBase()
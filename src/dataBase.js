const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile)
//const dataJson = require('./times.json')

const writeFileAsync = promisify(writeFile)

class DataBase {
    
    constructor(){
        this.NAME_ARCHIVE = './src/teams.json'
    }

    async getArchive(){
        const archive = await readFileAsync(this.NAME_ARCHIVE, 'utf8')
        return JSON.parse(archive.toString())        
    }

    async writeArchive(data){
        await writeFileAsync(this.NAME_ARCHIVE, JSON.stringify(data))
        return true
    }

    async create(data){
        
        const datas = await this.getArchive()
        const id = (!data.id && data.id <= 2) ? data.id : Date.now()
    
        const dataWithId = {
            id,
            ...data
        }
        const datasFinal = [
            ...datas,
            dataWithId
        ]

        const result = await this.writeArchive(datasFinal)
        return result
    }

    async list(id){
        const data = await this.getArchive()
        const dataFilter = data.filter(item => (id ? (item.id == id) : true))
        return dataFilter
    }

    async remove(id){
        if(!id){
            return this.writeArchive([])
        }
        const datas = await this.getArchive()
        const index = datas.findIndex(item => item.id == parseInt(id))

        if(index === -1){
            throw Error('Time de futebol não existe')
        }

        datas.splice(index, 1)
        return this.writeArchive(datas)
    }

    async update(id, data){
        const datas = await this.getArchive()
        const index = datas.findIndex(item => item.id == parseInt(id))

        if(index == -1){
            throw Error('Time de futebol não existe')
        }
        const actualData = datas[index]
        const updateData = {
            ...actualData,
            ...data
        }
        datas.splice(index,1)

        return await this.writeArchive([
            ...datas,
            updateData
        ])
    }
}

module.exports = new DataBase()
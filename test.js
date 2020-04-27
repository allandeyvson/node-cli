const {
    deepEqual,
    ok
} = require('assert')

const dataBase = require('./dataBase')
const DEFAULT_ITEM_CREATE = {
    name: 'Palmeiras',
    pais: 'Brasil',
    id: 1
}

const DEFAULT_ITEM_UPDATE = {
    name: 'Manchester United',
    pais: 'Inglaterra',
    id: 2
}

describe('suite de manipulação de times de futebol', () => {

    beforeEach(async () => {
        await dataBase.create(DEFAULT_ITEM_CREATE)
        await dataBase.create(DEFAULT_ITEM_UPDATE)
    })
    afterEach(async () => {
        await dataBase.remove(null)
    })
    
    it('deve pesquisar um time de futebol', async () => {
        const expected = DEFAULT_ITEM_CREATE
        const [result] =  await dataBase.list(expected.id)
        
        deepEqual(result, expected)
    })
    
    it('deve cadastrar um time de futebol', async () => {
        const expected = DEFAULT_ITEM_CREATE
        const result = await dataBase.create(DEFAULT_ITEM_CREATE)
        const [actual] = await dataBase.list(DEFAULT_ITEM_CREATE.id)

        deepEqual(actual, expected)
    })

    it('deve remover um time de futebol', async () => {
        const expected = true
        const result = await dataBase.remove(DEFAULT_ITEM_CREATE.id)

        deepEqual(result, expected)
    })

    it('deve atualizar um time de futebol', async () => {
        const expected = {
            ...DEFAULT_ITEM_UPDATE,
            name: 'Manchester City'
        }
        const update = await dataBase.update(DEFAULT_ITEM_UPDATE.id, expected)
        const [result] = await dataBase.list(expected.id)
        console.log('resultado', result)
        deepEqual(result, expected)
    })

})
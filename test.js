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

describe('suite de manipulação de times de futebol', () => {

    it('deve pesquisar um time de futbeol', async () =>{
        const expected = DEFAULT_ITEM_CREATE
        const [result] =  await dataBase.list(expected.id)

        deepEqual(result, expected)
    })
})
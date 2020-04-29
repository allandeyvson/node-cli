const commander = require('commander')
const dataBase = require('./src/dataBase')
const Team = require('./src/team')

async function main(){
    commander
        .version('v1')
        .option('-n, --name [value]', "Nome do time de futebol.")
        .option('-c, --country [value]', "Nome do país do time de futebol.")
        .option('-i --id [value]', "Id do time de futebol.")

        .option('-C, --create', "Cadastrar um time de futebol.")
        .option('-L --list', "Listar um time de futebol.")
        .option('-R --remove', "Remove um time de futebol.")
        .option('-U --update [value]', "Atualiza um time de futebol passando um id.")

        .parse(process.argv)
    
    const team = new Team (commander)
    try{
        if (commander.create){
            delete team.id
            const result = await dataBase.create(team)
            if (!result){
                console.error('O time não pode ser cadastrado.')
                return;
            }
            console.log('Time cadastrado com sucesso.')
        }
        if (commander.list){
            const result = await dataBase.list(team.id)
            console.log(result)
            return;
        }
        if(commander.remove){
            const result = await dataBase.remove(team.id)
            if(!result){
                console.error('Time de futbeol não pode ser removido.')
                return;
            }
            console.log('Time de futebol removido com sucesso.')
        }
        if(commander.update){
            const id = commander.update
            const data = JSON.stringify(team)
            const dataUpdate = JSON.parse(data)
            
            const result = await dataBase.update(id,dataUpdate)
            if(!result){
                console.error('Time de futbeol não pode ser atualizado.')
                return;
            }
            console.log('Time de futebol atualizado com sucesso.')
        }
    }catch(error){
        console.error('deu erro: ', error);
    }
}
main()
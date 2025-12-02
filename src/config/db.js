const {Pool} = require('pg')

const pool = new Pool({
    user: 'julio',
    host: 'localhost',
    database: 'medicine',
    password: 'JCFA2711',
    port: 5432
})

pool.connect()
.then(() => console.log ('Conectado ao PostgreSQL!'))
.catch(err => console.log('Erro ao conectar ao PostgreSQL!!', err))

module.exports = pool
const pool = require('../config/db')

const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' })
    }
}

const createUser = async (req, res) => {
    const {nome, email, senha} = req.body
    try {
        const result = await pool.query('INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, senha])
            res.status(200).json(result.rows[0])
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário'})
            console.error('Erro ao criar usuario:', error.message)
        }
    }

    const updateUser = async (req, res) => {
        const {id} = req.params
        const {nome, email, senha} = req.body
        try {
            const result = await pool.query('UPDATE users SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
                [nome, email, senha, id])
                res.status(200).json(result.rows[0])
            } catch (err) {
                res.status(500).json({ error: 'Erro ao atualizar usuário'})
                console.error('Erro ao atualizar usuário:', err.message)
            }
    }

    const deleteUser = async (req, res) => {
        const {id} = req.params
        try {
            const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', 
                [id])
                res.status(200).json ({ message: 'Usuário deletado com sucesso'})
            } catch (err) {
                res.status(500).json({ error: ' Erro ao deletar o usuário'})
                console.error('Erro ao deletar usuário:', err.message)
            }
    }


module.exports = {getUsers, createUser, updateUser, deleteUser}
const pool = require('../config/db')

const getLembretes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM lembretes');
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar lembretes' })
    }
}

const getLembretesByUserId = async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM lembretes WHERE user_id = $1',
            [user_id]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar lembretes' });
    }
}



const createLembrete = async (req, res) => {
    const {nome_remedio, horario, recorrencia, tomar_agora, user_id} = req.body;
    try {
        const result = await pool.query('INSERT INTO lembretes (nome_remedio, horario, recorrencia, tomar_agora, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome_remedio, horario, recorrencia, tomar_agora, user_id])
            res.status(200).json(result.rows[0])
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar lembrete' })
        }
    }

const updateLembrete = async (req, res) => {
    const {id} = req.params
    const {nome_remedio, horario, recorrencia, tomar_agora, user_id} = req.body
    try {
        const result = await pool.query('UPDATE lembretes SET nome_remedio = $1, horario = $2, recorrencia = $3, tomar_agora = $4, user_id = $5 WHERE id = $6 RETURNING *',
            [nome_remedio, horario, recorrencia, tomar_agora, user_id, id])
            res.status(200).json(result.rows[0])
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar lembrete' })
        }
    }

const deleteLembrete = async (req, res) => {
    const {id} = req.params
    try {
        const result = await pool.query('DELETE FROM lembretes WHERE id = $1 RETURNING *', 
            [id])
            res.status(200).json ({ message: 'Lembrete deletado com sucesso'})
        } catch (err) {
            res.status(500).json({ error: ' Erro ao deletar o lembrete'})
        }
    }

module.exports = {getLembretes, getLembretesByUserId, createLembrete, updateLembrete, deleteLembrete}
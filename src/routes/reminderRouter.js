const express = require('express'); 
const app = express();
const reminderController = require('../controllers/reminderController')
const router = express.Router()

router.get('/', reminderController.getLembretes)
router.post('/', reminderController.createLembrete)
router.put('/:id', reminderController.updateLembrete)
router.delete('/:id', reminderController.deleteLembrete)

module.exports = router
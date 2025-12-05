const express = require('express');
const router = express.Router();
const {getUsers, getUsersbyId, createUser,loginUser,updateUser,deleteUser} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUsersbyId);
router.post('/register', createUser); 
router.post('/login', loginUser);     
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

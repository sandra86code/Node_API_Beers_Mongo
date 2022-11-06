const express = require('express')
const router = express.Router()

const {getUsers, getUser, addUser, deleteUser, editUser} = require('../controllers/usuarios')

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', addUser)
router.delete('/:id', deleteUser)
router.put('/:id', editUser)

module.exports = router
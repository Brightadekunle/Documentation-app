const express = require('express')
const router = express.Router()


const typeController = require('../controllers/typeController')

router.get('/create', typeController.typeCreateGet)

router.post('/create', typeController.typeCreatePost)

router.get('/update/:type_id', typeController.typeUpdateGet)

router.post('/update/:type_id', typeController.typeUpdatePost)

router.get('/delete/:type_id', typeController.typeDeletePost)

router.get('/types', typeController.typeDetailAllGet)

router.get('/:type_id', typeController.typeDetailOneGet)

module.exports = router
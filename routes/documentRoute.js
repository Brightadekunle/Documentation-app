const express = require('express')
const router = express.Router()


const documentController = require('../controllers/documentController')

router.get('/create', documentController.documentCreateGet)

router.post('/create', documentController.documentCreatePost)

router.get('/update/:document_id', documentController.documentUpdateGet)

router.post('/update/:document_id', documentController.documentUpdatePost)

router.get('/delete/:document_id', documentController.documentDeletePost)

router.get('/documents', documentController.documentDetailAllGet)

router.get('/:document_id', documentController.documentDetailOneGet)

module.exports = router
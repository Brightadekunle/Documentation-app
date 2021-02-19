const express = require('express')
const router = express.Router()


const applicationController = require('../controllers/applicationController')

router.get('/create', applicationController.applicationCreateGet)

router.post('/create', applicationController.applicationCreatePost)

router.get('/update/:application_id', applicationController.applicationUpdateGet)

router.post('/update/:application_id', applicationController.applicationUpdatePost)

router.get('/delete/:application_id', applicationController.applicationDeletePost)

router.get('/applications', applicationController.applicationDetailAllGet)

router.get('/:application_id', applicationController.applicationDetailOneGet)

module.exports = router
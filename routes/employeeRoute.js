const express = require('express')
const router = express.Router()


const employeeController = require('../controllers/employeeController')

router.get('/create', employeeController.employeeCreateGet)

router.post('/create', employeeController.employeeCreatePost)

router.get('/login', employeeController.employeeSigninGet)

router.post('/login', employeeController.employeeSigninPost)

router.get('/logout', employeeController.employeeLogout)

router.get('/update/:employee_id', employeeController.employeeUpdateGet)

router.post('/update/:employee_id', employeeController.employeeUpdatePost)

router.get('/delete/:employee_id', employeeController.employeeDeletePost)

router.get('/employees', employeeController.employeeDetailAllGet)

router.get('/:employee_id', employeeController.employeeDetailOneGet)

module.exports = router
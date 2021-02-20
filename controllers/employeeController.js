const models = require('../models')
const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
const path = require('path')
// const { isEmpty } = require('../config/customFunction')

const employeeCreateGet = (req, res, next) => {
    res.render('employee/createEmployee', { title: "Employee Create Page", success_msg: "", error_msg: "" })
}


const employeeCreatePost = (req, res, next) => {
    const { name, department, role, password } = req.body
    const errors = []

    if (!name || !department || !role || !password){
        errors.push({ msg: "Missing credentials" })
    }

    if (password.length < 6){
        errors.push({ msg: "Password should be at least 6 characters!." })
    }

    if (errors.length > 0){
        console.log(errors)
        res.render("employee/createEmployee", {
            title: "Employee Create Page",
            errors: errors,
            name: name,
            department: department,
            role: role,
            password: password,
            success_msg: "", 
            error_msg: "" 

        })
    } else {
        models.Employee.findOne({
            where: {
                name: name
            }
        })
            .then(employee => {
                if (employee){
                    errors.push({ msg: "Employee is already registered" })
                    res.render("employee/createEmployee", {
                        title: "Author Create Page",
                        errors: errors,
                        name: name,
                        department: department,
                        role: role,
                        password: password,
                        success_msg: "", 
                        error_msg: "" 
                    }) 
                } else {
                    const hash = bcrypt.hashSync(password, bcrypt.genSalt(10, (err) => {
                        if (err){
                            console.log(err)
                            res.send(err)
                        }
                    }))
                    
                    models.Employee.create({
                        name: req.body.name,
                        department: req.body.department,
                        role: req.body.role,
                        password: hash,
                    })
                        .then(employee => {
                            // res.status(201).json({
                            //     message: "Author created successfully",
                            //     Author: author
                            // })
                            req.flash('success_message', `${employee.role} created successfully`)
                            // res.redirect('/documentation/employee/')
                            res.send("Employee created successfully")
                        })
                        .catch(err => console.log(err))
    }
            })
    }
}

const employeeSigninGet = (req, res, next) => {
    const success_msg = req.flash('success_message')
    const error_msg = req.flash('error_message')
    const errors = req.flash('error')
    res.render('employee/employeeSignin', { title: "Employee Login Page", success_msg, error_msg, errors })
}

const employeeSigninPost = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/documentation/document/documents',
        failureRedirect: '/documentation/employee/login',
        failureFlash: true,
        successFlash: true,
        session: true
    })(req, res, next)
}

const employeeLogout = (req, res, next) => {
    // Logout Handle
    req.logOut()
    req.flash('success_message', 'You are logged out')
    res.redirect('/documentation/employee/login')
}


const employeeUpdateGet = (req, res, next) => {
    models.Employee.findByPk(req.params.employee_id)
        .then(employee => {
            res.render('updateEmployee', { title: "Employee Update Page", employee: employee })
        })
        .catch(err => console.log(err))
}


const employeeUpdatePost = (req, res, next) => {

    models.Employee.update({
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        role: req.body.role,
    }, {
        where: {
            id: req.params.employee_id
        }
    })
        .then(employee => {
            // console.log(post)
            // res.status(200).json({
            //     message: "category updated successfully",
            //     Category: category
            // })
            res.redirect('/documentation/employee/employees')
        })
        .catch(err => console.log(err))
}

const employeeDeletePost = (req, res, next) => {
    models.Employee.destroy({
        where: {
            id: req.params.employee_id
        }
    })
        .then(employee => {
            // console.log(category)
            // res.status(200).json({
            //     message: "Category deleted successfully",
            //     Category: category
            // })
            res.redirect('/documentation/employee/employees')
        })
        .catch(err => console.log(err))
}


const employeeDetailOneGet = (req, res, next) => {
    // models.Type.findByPk(req.params.type_id)
    //     .then(category => {
            
    //         models.DocumentCategory.findAll({
    //             include: [models.Post],
    //             where: {
    //                 CategoryId: category.id
    //             }
    //         })
    //             .then(posts => {
    //                     res.render('categorydetail', { title: "Category Detail Page", category, posts })
    //             })
    //             .catch(err => console.log(err))
    //     })
    //     .catch(err => console.log(err))
}


const employeeDetailAllGet = (req, res, next) => {

    models.Employee.findAll()
        .then(employees => {
            // res.status(200).json({
            //     message: "This is the list of all categories",
            //     categories: categories
            // })
            res.render('typelist', { title: "Employee List", employees })
        })
        .catch(err => console.log(err))
}

module.exports = {
    employeeCreateGet,
    employeeCreatePost,
    employeeSigninGet,
    employeeSigninPost,
    employeeLogout,
    employeeUpdateGet,
    employeeUpdatePost,
    employeeDeletePost,
    employeeDetailOneGet,
    employeeDetailAllGet,
}
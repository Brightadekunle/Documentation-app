const models = require('../models')

const employeeCreateGet = (req, res, next) => {
    res.render('createEmployee', { title: "Employee Create Page" })
}


const employeeCreatePost = (req, res, next) => {

    models.Employee.create({
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        role: req.body.role,
    })
        .then(employee => {
            // res.status(201).json({
            //     message: "Category created successfully",
            //     Category: category
            // })
            res.redirect('/documentation/employee/employees')
        })
        .catch(err => console.log(err))
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
    employeeUpdateGet,
    employeeUpdatePost,
    employeeDeletePost,
    employeeDetailOneGet,
    employeeDetailAllGet,
}
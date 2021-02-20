const models = require('../models')

const documentCreateGet = (req, res, next) => {
    console.log(req.user)
    models.Type.findAll()
        .then(types => {
            console.log(types)
            models.Application.findAll()
                .then(applications => {
                    models.Category.findAll()
                        .then(categories => {
                            res.render('document/createdocument', { title: "Document Create Page", types, applications, categories })
                        })
                })
        })
    
}

const documentCreatePost = (req, res, next) => {

    console.log(req.body)
    models.Document.create({
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status,
        ApplicationId: req.body.application,
        EmployeeId: req.user.id,
        TypeId: req.body.type,
        categoryId: req.body.category
    })
        .then(document => {
            // res.status(201).json({
            //     message: "Category created successfully",
            //     Category: category
            // })
            // res.redirect('/documentation/document/documents')
            res.send("Document created successfully")
        })
        .catch(err => console.log(err))
}

const documentUpdateGet = (req, res, next) => {
    models.Document.findByPk(req.params.document_id)
        .then(document => {
            res.render('document/updatedocument', { title: "Document Update Page", document: document })
        })
        .catch(err => console.log(err))
}


const documentUpdatePost = (req, res, next) => {

    models.Document.update({
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status,
        application: req.body.application,
        EmployeeId: req.body.employee,
        TypeId: req.body.type,
        categoryId: req.body.category 
    }, {
        where: {
            id: req.params.document_id
        }
    })
        .then(document => {
            // console.log(post)
            // res.status(200).json({
            //     message: "category updated successfully",
            //     Category: category
            // })
            res.redirect('/documentation/document/documents')
        })
        .catch(err => console.log(err))
}

const documentDeletePost = (req, res, next) => {
    models.Document.destroy({
        where: {
            id: req.params.document_id
        }
    })
        .then(document => {
            // console.log(category)
            // res.status(200).json({
            //     message: "Category deleted successfully",
            //     Category: category
            // })
            res.redirect('/documentation/document/documents')
        })
        .catch(err => console.log(err))
}


const documentDetailOneGet = (req, res, next) => {
    models.Document.findByPk(req.params.document_id)
        .then(document => {
            if (document.type == "Internal"){

            }
            else {
                res.render('document/documentdetails', { title: "Document Detail Page", document })
            }
            
            // models.DocumentCategory.findAll({
            //     include: [models.Post],
            //     where: {
            //         CategoryId: category.id
            //     }
            // })
            //     .then(posts => {
            //             res.render('categorydetail', { title: "Category Detail Page", category, posts })
            //     })
            //     .catch(err => console.log(err))
            
        })
        .catch(err => console.log(err))
}


const documentDetailAllGet = (req, res, next) => {

    models.Document.findAll()
        .then(documents => {
            // res.status(200).json({
            //     message: "This is the list of all categories",
            //     categories: categories
            // })
            res.render('document/documentlist', { title: "Document List", documents })
        })
        .catch(err => console.log(err))
}


module.exports = {
    documentCreateGet,
    documentCreatePost,
    documentUpdateGet,
    documentUpdatePost,
    documentDeletePost,
    documentDetailOneGet,
    documentDetailAllGet
}
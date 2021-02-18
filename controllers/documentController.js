const models = require('../models')

const documentCreateGet = (req, res, next) => {
    res.render('createDocument', { title: "Document Create Page" })
}


const documentCreatePost = (req, res, next) => {

    models.Document.create({
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status,
        ApplicationId: req.body.application,
        EmployeeId: req.body.employee,
        TypeId: req.body.type,
        categoryId: req.body.category 
    })
        .then(document => {
            // res.status(201).json({
            //     message: "Category created successfully",
            //     Category: category
            // })
            res.redirect('/documentation/document/documents')
        })
        .catch(err => console.log(err))
}

const documentUpdateGet = (req, res, next) => {
    models.Document.findByPk(req.params.document_id)
        .then(document => {
            res.render('updateDocument', { title: "Document Update Page", document: document })
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


const documentDetailAllGet = (req, res, next) => {

    models.Document.findAll()
        .then(documents => {
            // res.status(200).json({
            //     message: "This is the list of all categories",
            //     categories: categories
            // })
            res.render('documentlist', { title: "Document List", documents })
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
const models = require('../models')
const { selectOptions } = require('../config/customFunction')


const documentCreateGet = (req, res, next) => {
    // console.log(req.user)
    if (req.user){
        models.Type.findAll()
        .then(types => {
            models.Application.findAll()
                .then(applications => {
                    models.Category.findAll()
                        .then(categories => {
                            res.render('document/createdocument', { title: "Document Create Page", types, applications, categories })
                        })
                })
        })
    } else {
        res.render('error', { title: "Error 403", message: "You must be logged in to create a document" })
    }
}

const documentCreatePost = (req, res, next) => {

    models.Document.create({
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status,
        ApplicationId: req.body.application,
        EmployeeId: req.user.id,
        TypeId: req.body.type,
        CategoryId: req.body.category
    })
        .then(document => {
            res.redirect('/documentation/document/documents')
        })
        .catch(err => console.log(err))
}

const documentUpdateGet = (req, res, next) => {
    models.Document.findByPk(req.params.document_id, {
        include: [models.Category, models.Type, models.Application, models.Employee]
    })
        .then(document => {
            models.Type.findAll()
                .then(types => {
                    models.Application.findAll()
                        .then(applications => {
                            models.Category.findAll()
                                .then(categories => {
                                    res.render('document/updatedocument', { title: "Document Update Page", types, applications, categories, document, selectOptions })
                                })
                        })
                })
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
        CategoryId: req.body.category 
    }, {
        where: {
            id: req.params.document_id
        }
    })
        .then(document => {
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
            res.redirect('/documentation/document/documents')
        })
        .catch(err => console.log(err))
}


const documentDetailOneGet = (req, res, next) => {
    models.Document.findByPk(req.params.document_id, {
        include: [models.Employee, models.Type, models.Comment]
    })
        .then(document => {
            // console.log(document.Employee)
            models.Comment.findAll({
                include: [models.Employee]
            })
                .then(comments => {
                    res.render('document/documentdetails', { title: "Document Detail Page", document, comments })
                   
                })  
        })
        .catch(err => console.log(err))
}


const documentDetailAllGet = (req, res, next) => {

    models.Document.findAll()
        .then(documents => {
            res.render('document/documentlist', { title: "Document List", documents })
        })
        .catch(err => console.log(err))
}


const changeDocumentStatusGet = (req, res, next) => {
    models.Document.findByPk(req.params.document_id)
        .then(document => {
            res.render('document/changestatus', { title: "Change ststus", document })
        })
        .catch(err => console.log(err))
}

const changeDocumentStatusPost = (req, res, next) => {

    models.Document.update({
        status: req.body.status,
    }, {
        where: {
            id: req.params.document_id
        }
    })
        .then(document => {
            res.redirect(`/documentation/document/${req.params.document_id}`)
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
    documentDetailAllGet,
    changeDocumentStatusGet,
    changeDocumentStatusPost,
}
const models = require('../models')


function swapElement(array, indexA, indexB) {
    var tmp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = tmp;

    return array
  }


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

    let docCat = req.body.categories
    console.log(docCat)
    models.Document.create({
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status,
        ApplicationId: req.body.application,
        EmployeeId: req.user.id,
        TypeId: req.body.type,
    })
        .then(document => {
            console.log(document)
            if (docCat.length == 1){
                models.DocumentCategory.create({
                    DocumentId: parseInt(document.id),
                    CategoryId: parseInt(docCat)
                })
                    .then(() => {
                        res.redirect('/documentation/document/documents')
                    })
            } else {
                for (var id of docCat){
                    // console.log(id)
                    models.DocumentCategory.create({
                        DocumentId: document.id,
                        CategoryId: id
                    })
                        .then(documentCaregories => {
                            // console.log(postCaregories)
                            res.redirect('/documentation/document/documents')
                        })
                        .catch(err => console.log(err))
                }
            }
        })
        .catch(err => console.log(err))
}

const documentUpdateGet = (req, res, next) => {
    let newArr = ""
    let newCatArr = ""
    models.Document.findByPk(req.params.document_id, {
        include: [models.Category, models.Type, models.Application, models.Employee]
    })
        .then(document => {
            // console.log(document.Categories)
            models.Type.findAll()
                .then(types => {
                    models.Application.findAll()
                        .then(applications => {
                            applications.forEach(application => {
                                if (application.dataValues.name == document.Application.name){
                                    let appArrIndex = applications.indexOf(application)
                                    newArr = swapElement(applications, 0, appArrIndex)
                                    // console.log(newArr)
                                }
                            })
                            models.Category.findAll()
                                .then(categories => {
                                    categories.forEach(category => {
                                        document.Categories.forEach(docCategory => {
                                            if (category.dataValues.name == docCategory.name){
                                                let catArrIndex = categories.indexOf(category)
                                                newCatArr = swapElement(categories, 0, catArrIndex)
                                                // console.log(newArr)
                                            }
                                        })
                                })
                                    res.render('document/updatedocument', { title: "Document Update Page", types, applications: newArr, categories: newCatArr, document })
                                })
                        })
                })
        })
        .catch(err => console.log(err))
}


const documentUpdatePost = (req, res, next) => {

    let docCat = req.body.categories
    console.log(typeof docCat)
    models.Document.update({
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status,
        application: req.body.application,
        EmployeeId: req.body.employee,
        TypeId: req.body.type,
    }, {
        where: {
            id: req.params.document_id
        }
    })
        .then(document => {
            if (docCat.length == 1){
                models.DocumentCategory.update({
                    DocumentId: req.params.document_id,
                    CategoryId: docCat
                }, {
                    where: {
                        DocumentId: req.params.document_id
                    }
                })
                    .then(() => {
                        res.redirect('/documentation/document/documents')
                    })
            } else {
                for (var id of docCat){
                    // console.log(id)
                    models.DocumentCategory.update({
                        DocumentId: req.params.document_id,
                        CategoryId: id
                    }, {
                        where: {
                            DocumentId: req.params.document_id
                        }
                    })
                        .then(documentCaregories => {
                            // console.log(postCaregories)
                            res.redirect('/documentation/document/documents')
                        })
                        .catch(err => console.log(err))
                }
            }
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
const models = require('../models')

const applicationCreateGet = (req, res, next) => {
    res.render('application/createapplication', { title: "Application Create Page" })
}


const applicationCreatePost = (req, res, next) => {

    models.Application.create({
        name: req.body.name,
    })
        .then(application => {
            res.redirect('/documentation/application/applications')
        })
        .catch(err => console.log(err))
}

const applicationUpdateGet = (req, res, next) => {
    models.Application.findByPk(req.params.application_id)
        .then(application => {
            res.render('application/updateapplication', { title: "Application Update Page", application: application })
        })
        .catch(err => console.log(err))
}


const applicationUpdatePost = (req, res, next) => {

    models.Application.update({
        name: req.body.name,
    }, {
        where: {
            id: req.params.application_id
        }
    })
        .then(application => {
            res.redirect('/documentation/application/applications')
        })
        .catch(err => console.log(err))
}

const applicationDeletePost = (req, res, next) => {
    models.Application.destroy({
        where: {
            id: req.params.application_id
        }
    })
        .then(application => {
            res.redirect('/documentation/application/applications')
        })
        .catch(err => console.log(err))
}


const applicationDetailOneGet = (req, res, next) => {
    models.Application.findByPk(req.params.application_id, {
        include: [models.Document]
    })
        .then(application => {
            // console.log(category.Documents)
            res.render('application/applicationdetail', { title: "Application Detail Page", application: application })
        })
        .catch(err => console.log(err))
}


const applicationDetailAllGet = (req, res, next) => {

    models.Application.findAll()
        .then(applications => {
            res.render('application/applicationlist', { title: "Application List", applications })
        })
        .catch(err => console.log(err))
}

module.exports = {
    applicationCreateGet,
    applicationCreatePost,
    applicationUpdateGet,
    applicationUpdatePost,
    applicationDeletePost,
    applicationDetailOneGet,
    applicationDetailAllGet,   
}
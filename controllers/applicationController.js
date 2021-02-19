const models = require('../models')

const applicationCreateGet = (req, res, next) => {
    console.log("Application creation................")
    res.render('application/createapplication', { title: "Application Create Page" })
}


const applicationCreatePost = (req, res, next) => {

    models.Application.create({
        name: req.body.name,
    })
        .then(application => {
            // res.status(201).json({
            //     message: "Category created successfully",
            //     Category: category
            // })
            // res.redirect('/documentation/application/applications')
            res.send("Application created successfully")
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
            // console.log(post)
            // res.status(200).json({
            //     message: "category updated successfully",
            //     Category: category
            // })
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
            // console.log(category)
            // res.status(200).json({
            //     message: "Category deleted successfully",
            //     Category: category
            // })
            res.redirect('/documentation/application/applications')
        })
        .catch(err => console.log(err))
}


const applicationDetailOneGet = (req, res, next) => {
    // models.Type.findByPk(req.params.application_id)
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


const applicationDetailAllGet = (req, res, next) => {

    models.Application.findAll()
        .then(applications => {
            // res.status(200).json({
            //     message: "This is the list of all categories",
            //     categories: categories
            // })
            res.render('applicationlist', { title: "Application List", applications })
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
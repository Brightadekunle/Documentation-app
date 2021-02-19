const models = require('../models')

const typeCreateGet = (req, res, next) => {
    res.render('type/createtype', { title: "Type Create Page" })
}


const typeCreatePost = (req, res, next) => {

    models.Type.create({
        name: req.body.name,
    })
        .then(type => {
            // res.status(201).json({
            //     message: "Category created successfully",
            //     Category: category
            // })
            // res.redirect('/documentation/type/types')
            res.send("Type created successfully")
        })
        .catch(err => console.log(err))
}

const typeUpdateGet = (req, res, next) => {
    models.Type.findByPk(req.params.type_id)
        .then(type => {
            res.render('type/updatetype', { title: "Type Update Page", type: type })
        })
        .catch(err => console.log(err))
}


const typeUpdatePost = (req, res, next) => {

    models.Type.update({
        name: req.body.name,
    }, {
        where: {
            id: req.params.type_id
        }
    })
        .then(type => {
            // console.log(post)
            // res.status(200).json({
            //     message: "category updated successfully",
            //     Category: category
            // })
            res.redirect('/documentation/type/types')
        })
        .catch(err => console.log(err))
}

const typeDeletePost = (req, res, next) => {
    models.Type.destroy({
        where: {
            id: req.params.type_id
        }
    })
        .then(type => {
            // console.log(category)
            // res.status(200).json({
            //     message: "Category deleted successfully",
            //     Category: category
            // })
            res.redirect('/documentation/type/types')
        })
        .catch(err => console.log(err))
}


const typeDetailOneGet = (req, res, next) => {
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


const typeDetailAllGet = (req, res, next) => {

    models.Type.findAll()
        .then(types => {
            // res.status(200).json({
            //     message: "This is the list of all categories",
            //     categories: categories
            // })
            res.render('typelist', { title: "Type List", types })
        })
        .catch(err => console.log(err))
}

module.exports = {
    typeCreateGet,
    typeCreatePost,
    typeUpdateGet,
    typeUpdatePost,
    typeDeletePost,
    typeDetailOneGet,
    typeDetailAllGet,   
}
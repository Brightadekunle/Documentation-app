const models = require('../models')

const categoryCreateGet = (req, res, next) => {
    res.render('category/createcategory', { title: "Category Create Page" })
}


const categoryCreatePost = (req, res, next) => {

    models.Category.create({
        name: req.body.name,
    })
        .then(category => {
            res.redirect('/documentation/category/categories')
        })
        .catch(err => console.log(err))
}

const categoryUpdateGet = (req, res, next) => {
    models.Category.findByPk(req.params.category_id)
        .then(category => {
            res.render('category/updatecategory', { title: "Category Update Page", category: category })
        })
        .catch(err => console.log(err))
    
}


const categoryUpdatePost = (req, res, next) => {

    models.Category.update({
        name: req.body.name,
    }, {
        where: {
            id: req.params.category_id
        }
    })
        .then(category => {
            res.redirect('/documentation/category/categories')
        })
        .catch(err => console.log(err))
}

const categoryDeletePost = (req, res, next) => {
    models.Category.destroy({
        where: {
            id: req.params.category_id
        }
    })
        .then(category => {
            res.redirect('/documentation/category/categories')
        })
        .catch(err => console.log(err))
}

const categoryDetailOneGet = (req, res, next) => {
    models.Category.findByPk(req.params.category_id, {
        include: [models.Document]
    })
        .then(category => {
            console.log(category.Documents)
            res.render('category/categorydetail', { title: "Category Detail Page", category: category })
        })
        .catch(err => console.log(err))
}


const categoryDetailAllGet = (req, res, next) => {

    models.Category.findAll()
        .then(categories => {
            res.render('category/categorylist', { title: "Category List", categories })
        })
        .catch(err => console.log(err))
}


module.exports = {
    categoryCreateGet,
    categoryCreatePost,
    categoryUpdatePost,
    categoryDetailOneGet,
    categoryDeletePost,
    categoryUpdateGet,
    categoryDetailAllGet,
}
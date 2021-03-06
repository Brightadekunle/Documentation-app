const models = require('../models')

const commentCreatePost = (req, res, next) => {

    if (req.user){
        let documentId = parseInt(req.params.documentId)
        models.Comment.create({
            body: req.body.comment,
            EmployeeId: req.user.id,
            DocumentId: documentId,
        })
            .then(comment => {
                res.redirect(`/documentation/document/${documentId}`)
            })
            .catch(err => console.log(err))
    } else {
        res.json({
            msg: "You must be logged in to access this resource"
        })
    }
}

const commentUpdatePost = (req, res, next) => {
    models.Comment.update({
        body: req.body.body,
        EmployeeId: req.body.employeeId,
        DocumentId: req.body.documentId,
    }, {
        where: {
            id: req.params.comment_id
        }
    })
        .then(comment => {
            // console.log(post)
            res.status(200).json({
                message: "comment updated successfully",
                Comment: comment
            })
        })
        .catch(err => console.log(err))
}

const commentDeletePost = (req, res, next) => {
    models.Comment.destroy({
        where: {
            id: req.params.comment_id
        }
    })
        .then(comment => {
            // console.log(category)
            res.status(200).json({
                message: "Comment deleted successfully",
                Comment: comment
            })
        })
        .catch(err => console.log(err))
}

const commentDetailOneGet = (req, res, next) => {
    models.Comment.findOne({
        where: {
            id: req.params.comment_id
        }
    })
        .then(comment => {
            // console.log(category)
            res.status(200).json({
                message: "These are the details of a single comment.",
                commentDetails: comment
            })
        })
        .catch(err => console.log(err))
        

}


const commentDetailAllGet = (req, res, next) => {

    models.Comment.findAll()
        .then(comment => {

            // console.log(comment)
            res.status(200).json({
                message: "This is the list of all comment",
                comment: comment
            })
        })
        .catch(err => console.log(err))
}


module.exports = {
    commentCreatePost,
    commentUpdatePost,
    commentDetailOneGet,
    commentDetailAllGet,
    commentDeletePost,
}
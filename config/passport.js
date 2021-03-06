const { Strategy } = require('passport-local')
const bcrypt = require('bcrypt-nodejs')

const models = require('../models')

function isValidPassword(userpassword, password){
    return bcrypt.compareSync(password, userpassword)
}


const initialize = function(passport){
    passport.use(
        new Strategy({ usernameField: 'name' }, (name, password, done) => {
            models.Employee.findOne({
                where: {
                    name: name
                }
            })
                .then(user => {
                    // console.log('user-', user)
                    if (!user){
                        return done(null, false, { message: 'Account is not registered' })
                    }
                    if (!isValidPassword(user.password, password)){
                        return done(null, false, { message: 'Invalid Password' })
                    }
                    const userInfo = user
                    // console.log(userInfo)
                    return done(null, userInfo)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        models.Employee.findByPk(id)
            .then((user) => {
            if (user){
                return done(null, user)
            } else{
                return done(null, false)
            }
        })
            .catch((err) => {
                console.log('There was an error deserializing user')
                throw err
            })
    }) 
}

module.exports = initialize



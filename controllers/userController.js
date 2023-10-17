const { comparePassword } = require('../helpers/bcrypt')
const  {User} = require('../models')
const user = require('../models/user')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register(req, res) {
        const {email, password, username} = req.body
        User.create({
            email, 
            password, 
            username
        })
        .then(result => {   
            let response = {
                id: result.id,
                email: result.email,
                username: result.username
            }
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
    }

    static login(req, res) {
        const {email,password} = req.body
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(!user){
                throw {
                    name: "User Login Error",
                    devMessage: `User With Email "${email}" Not Found`
                }
            }
            const isCorrect = comparePassword(password, user.password)
            if(!isCorrect){
                throw {
                    name: "User Login Error",
                    devMessage:`User With Email "${email}" ain't got the right password`
                }
            }
            let payload = {
                id: user.id,
                email: user.email
            }

            const token = generateToken(payload)

            return res.status(200).json({token})
        })
        .catch(err => {
            res.status(401).json(err)
            console.log(err)
        })
    }
}

module.exports = UserController;
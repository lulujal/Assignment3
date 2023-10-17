const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

function authentication(req, res, next) {
    try {
        const token = req.get("token")
        const userDecoded = verifyToken(token)
        User.findOne({
            where: {
                id: userDecoded.id,
                email: userDecoded.email
            }
        })
        .then (user => {
            if(!user){
                return res.status(401).json({
                    name: "User Not Authenticated",
                    devMessage:`User With Id "${userDecoded.id}" ain't found in our database`
                })
            }
            res.locals.user = user
            return next()
        })
        .catch(err => {
            return res.status(401).json(err)
        })
    } catch (err) {
        return res.status(401).json(err)
    }
}

module.exports = authentication
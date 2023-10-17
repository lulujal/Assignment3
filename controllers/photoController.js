const { Photo, User } = require('../models')
class PhotoController {
    static GetAllPhotos(req, res) {
        Photo.findAll({
            include: User
        })
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
    static getOnePhotoByID(req,res){
        const id = req.params.id
        Photo.findByPk(id)
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }

    static addPhoto(req,res){
        const {title,caption,image_url} = req.body
        const user = res.locals.user
        Photo.create({
            title,
            caption,
            image_url,
            UserId: user.id
        })
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }

    static updatePhoto(req,res){
        const id = req.params.id
        const {title,caption,image_url} = req.body
        Photo.update({
            title,
            caption,
            image_url
        },{
            where:{
                id
            },
            returning:true
        })
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }

    static deletePhoto(req,res){
        const id = req.params.id
        Photo.destroy({
            where:{
                id
            }
        })
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
}

module.exports = PhotoController
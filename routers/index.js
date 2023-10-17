const router = require('express').Router()
const UserController = require('../controllers/userController')
const PhotoController = require('../controllers/photoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.post('/users/register', UserController.register)
router.post('/users/login', UserController.login)
router.use(authentication)
router.get('/photos', PhotoController.GetAllPhotos);
router.get('/photos/:id', PhotoController.getOnePhotoByID);
router.post('/photos', PhotoController.addPhoto);
router.use('/photos/:id',authorization)
router.put('/photos/:id', PhotoController.updatePhoto);
router.delete('/photos/:id', PhotoController.deletePhoto);

module.exports = router
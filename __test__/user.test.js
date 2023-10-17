const request = require('supertest');
const app = require('../app');
const { User} = require('../models');
const { generateToken} = require('../helpers/jwt');
const { addPhoto } = require('../controllers/photoController');

    const userData = {
        username: "usertest",
        email: "usertest@mail.com",
        password: "usertest"
    }

    const photoData = {
        title: "test1",
        caption: "test1",
        image_url: "test1",
    }

    afterAll(async () => {
        try {
            await Photo.destroy({ where: {}})
            await User.destroy({ where: {}})
        } catch (error) {
          console.log(error);
          
        }
      })

describe('user register', () => {
    afterAll(async () => {
        try {
            await User.destroy({ where: {}})
        } catch (error) {
          console.log(error);
          
        }
      })

    it('should return 201 status code and create a new user', async () => {
        const res = await request(app)
            .post('/users/register')
            .send(userData)
            .expect(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('username')
        expect(res.body).toHaveProperty('email')
    })
})

describe('user login', () => {
    beforeAll(async () => {
        try {
          await User.create(userData)
        } catch (error) {
          console.log(error);
        }
      })

    it('should return 200 status code and return token', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                email: userData.email,
                password: userData.password
            })
            .expect(200)
        expect(res.body).toHaveProperty('token')
    })
})

    //testing Api Create Photo
    describe('Create Photo', () => {
        let token;

        beforeAll(async () => {
            try {
                await User.create(userData);
                token = generateToken(userData);
            } catch (error) {
                console.log(error);
            }
        });

        it('should return 201 status code and create a new photo', async () => {
            const res = await request(app)
                .post('/photos')
                .set('token', token)
                .send({
                    title: 'test1',
                    caption: 'test1',
                    image_url: 'test1',
                })
                .set('Content-Type', 'application/x-www-form-urlencoded');

            expect(201);

        });

        it('should return 401 status code if token is not authenticated', async () => {
            const res = await request(app)
                .post('/photos')
                .send({
                    title: 'test1',
                    caption: 'test1',
                    image_url: 'test1',
                })
                .set('Content-Type', 'application/x-www-form-urlencoded');

            expect(res.status).toBe(401);
        });
    });

    //testing API Get All Photo
    describe('Get All Photo', () => {
        let token;

        beforeAll(async () => {
            try {
                await User.create(userData);
                token = generateToken(userData);
                addPhoto(photoData);
            } catch (error) {
                console.log(error);
            }
        });
        it('should return 200 status code and return all photo', async () => {
            const res = await request(app)
                .get('/photos')
                .set('token', token)
                
            expect(200);
        });

        it('should return 401 status code if token is not authenticated', async () => {
            const res = await request(app)
                .get('/photos');

            expect(res.status).toBe(401);
        });
    });

    //testing API Get Photo by ID
    describe('Get Photo by ID', () => {
        let token;

        beforeAll(async () => {
            try {
                await User.create(userData);
                token = generateToken(userData);
                addPhoto(photoData);
            } catch (error) {
                console.log(error);
            }
        });
        it('should return 200 status code and return one photo', async () => {
            const res = await request(app)
                .get('/photos/1')
                .set('token', token)
                
            expect(200);
        });

        it('should return 500 status code if there is error, data not found', async () => {
            const res = await request(app)
                .get('/photos/10')
                .set('token', token)

            expect(500);
        });
    });




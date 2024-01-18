import { Router } from 'express';
import userModel from '../dao/models/user.model.js';
import { createHash, validatePassword } from '../utils.js';
import passport from 'passport';

const router = Router();

// router.post('/register', async (req, res) => {
//     const {first_name, last_name, email, password} = req.body;

//     const exists = await userModel.findOne({email})

//     if (exists) {
//         return res.status(400)
//         .send({
//             status: 'error',
//             error: 'El usuario ya existe'
//         })
//     }
//     const user = {
//         first_name,
//         last_name,
//         email,
//         password: createHash(password)
//     }

  

//     let result = await userModel.create(user)


//     res.send({
//         status: 'success',
//         msg: 'usuario registrado'
//     })
// })

router.post('/register', passport.authenticate("register", {failureRedirect:"/api/sessions/failregister"}),
async(req, res) => {
    res.send({
        status: 'success',
        msg: 'usuario registrado'
    })
});

router.get('/failregister', async(req, res) => {
    console.log("Fallo el registro");
    res.send({ error: 'Fallo el registro' });
});

// router.post('/login', async (req, res) => {
//     const {email, password} = req.body
//     const user = await userModel.findOne({email});

//     if (!user) {
//         return res.status(400)
//         .send({
//             status: 'error',
//             error: 'datos incorrectos'
//         })
//     }

//     const isValidPassword = validatePassword(password, user)

//     if(!isValidPassword){
//         return res.status(400)
//         .send({
//             status: 'error',
//             error: 'datos incorrectos'
//         })
//     }

//     req.session.user = {
//         full_name: `${user.first_name} ${user.last_name}`,
//         email: user.email
//     }

//     res.send({
//         status: 'success',
//         payload: req.session.user,
//         msg: 'Mi primer login'
//     })

// })

router.post('/login', passport.authenticate("login", {failureRedirect: '/api/sessions/faillogin'}),
async (req, res) => {
    if(!req.user){
        return res.status(400).send({status: "error"})
    }
    req.session.user = {
        full_name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email
    }
    res.send({
        status: "success",
        paylaod: req.user
    })
}
)

router.get("/faillogin", (req, res) => {
    res.send({error: "fail login"});
})

router.get('/logout', async (req, res) => {
    req.session.destroy(err=> {
        if (err) {
            return res.status(500).send({
                status: 'error',
                error: 'No se pudo procesar'
            });
        }
        res.redirect('/login');
    })
})








export default router;
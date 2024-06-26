import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2"
import moment from "moment";

import userModel from "../dao/models/user.model.js";
import { CartManagerDB } from "../dao/managers/mongo/CartManagerDB.js";
import {createHash, validatePassword} from "../utils.js";

const cartManager = new CartManagerDB()
const LocalStrategy = local.Strategy;

const inicializePassport = () => {

    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:"email"},
        async ( req, username, password, done ) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            
            let user = await userModel.findOne({email:username});
            if(user){
                console.log('Usuario ya registrado');
                return done(null,false)
            }

            const cart = await cartManager.createCart()

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                cart: cart._id,
                password: createHash(password),
                lastConnection: moment()
            }
            console.log(newUser.lastConnection);
            const result = await userModel.create(newUser);
            return done (null, result);

        } catch (error) {
            return done(error)
        }    

        }
    ));

    passport.use("login", new LocalStrategy(
        {usernameField: "email"},
        async(username, password, done) => {
            try {
                let user = await userModel.findOne({email: username});
                if(!user) {
                    return done(null, false);
                }
                if(!validatePassword(password, user)) {
                    return done(null, false);
                }
                user.lastConnection = moment();
                await user.save();
                console.log(user.lastConnection);
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ))

    passport.serializeUser((user, done) =>{
        done(null, user._id)
    });

    passport.deserializeUser(async(id, done) =>{
        let user = await userModel.findById(id);
        done(null, user)
    });

    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.299729d43fce9e1b",
        clientSecret: "35635026357a93226cd1905c5a206b52de95ecaf",
        callbackURL: "https://entregablebackend-production.up.railway.app/api/sessions/githubcallback"
    }, async(accessToken, refreshToken, profile, done) =>{
        try {
            console.log(profile._json.name, profile.username)
            const first_name = profile._json.name
            let email
            if(!profile._json.email){
                email = profile.username
            } else {
                email = profile._json.email
            }

            let user = await userModel.findOne({email});
            if(user){
                console.log('Usuario ya registrado');
                user.lastConnection = moment()
                await user.save();
                console.log(user.lastConnection);
                return done(null,user)
            }

            const cart = await cartManager.createCart()

            const newUser = {
                first_name,
                last_name: "",
                email,
                age: 18,
                cart: cart._id,
                password: "",
                lastConnection: moment()
            }
            const result = await userModel.create(newUser);
            //console.log(newUser)
            console.log(newUser.lastConnection);
            return done (null, result);

        } catch (error) {
            return done(error);
        }
    }))

}

export default inicializePassport
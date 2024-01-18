import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2"

import userModel from "../dao/models/user.model.js";
import {createHash, validatePassword} from "../utils.js";

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
            const newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password)
            }
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
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async(accessToken, refreshToken, profile, done) =>{
        try {
            console.log(profile)

            let user = await userModel.findOne({email:profile._json.email});
            if(user){
                console.log('Usuario ya registrado');
                return done(null,user)
            }
            const newUser = {
                first_name: profile._json.name,
                last_name: "",
                email: profile._json.email,
                password: ""
            }
            const result = await userModel.create(newUser);
            return done (null, result);

        } catch (error) {
            return done(error);
        }
    }))

}

export default inicializePassport
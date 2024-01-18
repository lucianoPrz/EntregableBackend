import passport from "passport";
import local from "passport-local";

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
                age,
                password: createHash(password)
            }
            const result = await userModel.create(newUser);
            return done (null, result);

        } catch (error) {
            return done(error)
        }    

        }
    ));

    passport.serializeUser((user, done) =>{
        done(null, user._id)
    });

    passport.deserializeUser(async(id, done) =>{
        let user = await userModel.findById(id);
        done(null, user)
    });

}

export default inicializePassport
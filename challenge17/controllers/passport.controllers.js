import passport from 'passport'
import bCrypt from 'bcrypt'

import * as localPassport from 'passport-local'
const LocalStrategy = localPassport.Strategy;

import mongoose from 'mongoose'
import { mongoConn } from '../persistence/config/connection.js'
mongoose.connect(mongoConn.url, mongoConn.options)

import { User } from '../models/User.js'
import UserDaoMongoDB from '../daos/UserDaoMongoDB.js'
const users = new UserDaoMongoDB();

import { loggerConsole } from './server.controllers.js'

export function createBCryptHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null);
}

export function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

export const initPassport = () => {
    passport.use('login', new LocalStrategy(async (username, password, done) => {
        let user = await users.getByKeyValue('username', username)
        loggerConsole.info('register', user)
        if (!user) {
            loggerConsole.info(`Username ${username} Not Found`);
            return done(null, false, { msgError: 'Wrong Credentials' });
        }
        if (!isValidPassword(user, password)) {
            loggerConsole.info('Invalid Password');
            return done(null, false, { msgError: 'Wrong Credentials' });
        }
        return done(null, user);
    })
    )

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
        async (req, username, password, done) => {
            let msg = { msgSuccess: 'Successfully SignUp User' }
            let newUser = false

            let user = await users.getByKeyValue('username', username)
            if (user) {
                loggerConsole.info('User already exists');
                msg = { msgError: 'User Already Exists' }
            } else {
                loggerConsole.info('Successfully SignUp User')
                newUser = new User(username, createBCryptHash(password))
                users.save(newUser)
            }
            return done(null, newUser, msg)
        })
    )

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}

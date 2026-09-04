import { registerUser } from '../controllers/authentificationController' ; 
import express from 'express'


export const authRouter  = express.Router() ; 

authRouter.post('/register',registerUser ) ;

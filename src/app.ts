import express from "express";
import { type Request ,type Response  } from "express";
import { requireAdmin } from "./middleware/auth";
import { errorHandler } from "./middleware/error";
import cookieParser from "cookie-parser" ; 
import { startups , people } from "./Data/data";
import {fetchMovies} from "./scripts/fetchMovies";
import cors from 'cors' ; 
import mongoose from "mongoose";
import "dotenv/config";



const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI ; 

if(!MONGO_URI)
{

    throw new Error ("URI de la base de donnée est inccorrecte ou nest pas definie dans .env") ; 
}

mongoose.connect(MONGO_URI)
    .then(() => {
    console.log('✅ Connexion réussie à MongoDB Atlas !');
  })



app.use(cookieParser())
console.log(cookieParser());




app.get("/" , (req : Request ,rep : Response  )=>{

    rep.json({
        message : "EXPRESS est OK !"

    });

});
app.get("/home" , (req : Request,rep : Response)=>{

    rep.json({
        message : "Home!"

    });

});

app.get("/api" , (req : Request,res : Response)=>{ 

    res.json(startups)

} );
app.get("/test-movies", async (req, res) => {
  const movies = await fetchMovies();
  res.json(movies);
});

app.get("/test", (req : Request , res : Response)=>{

  res.send(people)

})



app.post( "/Menu" ,(req : Request,rep : Response)=>{

    rep.json({
        message : "menu"

    })

});

app.use("/admin" , requireAdmin  , (res : Response,req : Request)=>{

    res.json({

        message : "accés interdit " 
    });


});

app.use(errorHandler , (req : Request , res : Response )=>{

    res.json(

        { message : "Error /Bug de server  imprévue "}
    )

});

app.get('/api/:category/:type', (req, res) => {

    console.log(req.params)
    res.json()

})

app.get("api/:field/:term",(req,res)=>{
    
    const {field  ,term} = req.params ;
    

     const filteredData = startups.filter(
      (startup) => { 
        const fieldVal = startup[field as keyof typeof startup] ;
        if(typeof fieldVal == "string" )
        {
        return fieldVal.toLowerCase() === term.toLowerCase() ;
        }
        return false ; 
    }
    
  )
    res.json({field,term,results: filteredData});
    

})

/*



*/

export default app ;



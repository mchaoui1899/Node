import express from "express";
import { type Request ,type Response  } from "express";
import { requireAdmin } from "./middleware/auth";
import { errorHandler } from "./middleware/error";
import cookieParser from "cookie-parser" ; 

const app = express();

app.use(express.json());
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

export default app ;
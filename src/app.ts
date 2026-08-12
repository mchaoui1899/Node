import express from "express";
import { type Request ,type Response  } from "express";
const app = express();

app.use(express.json());

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

export default app ;
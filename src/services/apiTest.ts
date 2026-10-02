import { Express  } from "express";
import { Request ,Response } from "express";
import { METHODS } from "http";
import express from 'express' ; 
import { error } from "console";
const ser = express() ; 
ser.use(express.json());

interface  Bookmark{
    id : number ,
    url : string ,
    title : string ,
}

let TAB : Bookmark[] = []; 

ser.post("/api/bookmarks", (req : Request , res : Response)=>{
    
    const {url , title } = req.body();

    const newBookMark : Bookmark = {
        id : Date.now() , 
        url : url  , 
        title : title  ,

    } ;

    TAB.push(newBookMark) ; 
    return res.status(201).json(newBookMark);
    
} );
ser.get("/api/bookmarks/:id", (req : Request , res : Response)=>{
   const IDreq = Number(req.params.id );

   const bookMark = TAB.find((i)=>{i.id === IDreq}) ; 

   if(bookMark)
   {
        return res.status(200).json(bookMark) ;

   }   
} );
ser.put("/api/bookmarks", (req : Request , res : Response)=>{
    const idR = Number(req.params.id) ; 
    const exist = TAB.find((a)=>{ a.id === idR});
    const inde = TAB.findIndex((a=>{a.id===idR})) ; 
        if(!exist)  return res.status(404).json({error : "non trouvé  ! "}) ; 
    
    const { url , title } = req.body() ; 

    TAB[inde] = {
        id : idR ,
        url : url ,
        title : title 
    }   
    
    return res.status(200).json(TAB) ;


} );
ser.delete("/api/bookmarks/:id", (req : Request , res : Response)=>{

    const ID = Number(req.params.id) ;
    const ex = TAB.some((a)=>{a.id===ID}) ; 
    if(ex)
    {

    TAB=TAB.filter((a=>{a.id !== ID})) ;
    return res.status(200).send() ;
            
    }
    else
    {
        return res.status(404).json({error : "non suppmrimé     "}) ;
    }
} );

ser.
listen(3000, () => console.log("Serveur démarré sur le port 3000"));
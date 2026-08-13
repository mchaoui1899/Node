import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  
  console.error("Erreur ",  err.stack);

  res.status(500).send("error/Bug de server !");
};

// 500 error
//403 forbieden 

//200 (OK) : Requête réussie.

//201 (Created) : Ressource créée avec succès (ex: création de compte, ajout en BDD).

//204 (No Content) : Succès, mais aucune donnée renvoyée (ex: suppression DELETE).

//400 (Bad Request) : Données envoyées invalides ou manquantes (ex: champ formulaire obligatoire vide).

//401 (Unauthorized) : Pas authentifié (tu n'es pas connecté / pas de token JWT). (Différent de 403 !)

//404 (Not Found) : La route ou la ressource n'existe pas.

//409 (Conflict) : Conflit de données (ex: email déjà existant en BDD).

// 500 (Internal Server Error) : Bug serveur imprévu.

// 502 / 503 : Serveur indisponible, en maintenance ou surcharge.
//
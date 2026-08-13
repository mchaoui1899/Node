import { Request, Response, NextFunction } from "express";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {


  const userRole = req.headers["x-user-role"];

  if (userRole !== "admin") {
    res.status(403).json({ message: "Accès refusé : Réservé aux administrateurs." });
    return;
  }

  next();
};

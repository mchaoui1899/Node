import validator from 'validator';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';

export async function registerUser(req: Request, res: Response) {

  let { name, email, username, password } = req.body;

  // --- Vérification des champs obligatoires ---
  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  name     = name.trim();
  email    = email.trim();
  username = username.trim();

  // --- Validation du nom d'utilisateur ---
  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error: "Le nom d'utilisateur doit contenir 1 à 20 caractères (lettres, chiffres, _ ou -).",
    });
  }

  // --- Validation de l'email ---
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Format d'email invalide." });
  }

  // --- Validation du mot de passe (min 6 caractères) ---
  if (password.length < 6) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });
  }

  try {

    // --- Vérification des doublons (email ou username déjà utilisé) ---
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : "nom d'utilisateur";
      return res.status(409).json({ error: `Ce ${field} est déjà utilisé.` });
    }

    // --- Hashage du mot de passe ---
    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- Création et sauvegarde de l'utilisateur dans MongoDB Atlas ---
    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    console.log(`✅ Nouvel utilisateur inscrit : ${newUser.username} (${newUser.email})`);

    return res.status(201).json({
      message: 'Inscription réussie !',
      user: {
        id:       newUser._id,
        name:     newUser.name,
        email:    newUser.email,
        username: newUser.username,
        role:     newUser.role,
      },
    });

  } catch (err: any) {

    console.error("Erreur lors de l'inscription :", err.message);
    return res.status(500).json({ error: 'Inscription échouée. Veuillez réessayer.' });

  }
}

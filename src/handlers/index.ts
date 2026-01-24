import { User } from "../models/User";

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    
    await User.create(req.body);
    
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ 
      message: 'Error al registrar el usuario', 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    });
    }

}
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../users/entities/users.entities';
import { UserService } from '../users/services/users.service';

// Login middleware to verify if the user is logged
const loginVerify = async (req: Request, res: Response, next: () => void) => {
  // TODO: we can handle roles here, for example, if the user is an admin, we can allow him to access all routes
  // or block user to handle only routes that he can access for example only modify his own profile

  if (!req.cookies || !req.cookies.token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const token = req.cookies.token;
  console.log(`fastlog => token`, token);

  const decoded = jwt.verify(token, config.value.jwt.secret);

  if (decoded) {
    console.log(`fastlog => decoded`, decoded);
    const { id, email } = decoded;
    const userService = new UserService();
    const user = (await userService.findOne(id)) as unknown as User;

    if (user && user.email === email) {
      next();
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
};

export default loginVerify;

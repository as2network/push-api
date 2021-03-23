 import { Request, Response } from 'express';
import { User } from '../models/User';
import { getRepository } from 'typeorm';
import { validationResult } from 'express-validator';
import { generateJwt } from '../utils/Jwt.util';

export class AuthController {
  static async login(request: Request, response: Response) {
    try {
      //Check if username and password are set
      const errors = validationResult(request);

      let { email, password } = request.body;
      if (!errors.isEmpty()) {
        return response.status(400).json({ success: false, errors: errors.array() });
      }

      const userRepository = getRepository(User);

      try {
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
          return response.status(401).json({ success: false, message: 'Unable to find user' });
        }

        if (!user.validatePassword(password)) {
          return response.status(401).json({ success: false, message: 'Unable to find user' });
        }

        const token = await generateJwt(user);

        response.json({ success: true, user: user.userInfo, token });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      return response.status(500).json({ success: false, message: 'Error 500' });
    }
  }

  static async register(request: Request, response: Response) {
    try {
      const {
        email,
        firstname,
        lastname,
        password
      } = request.body;

      const user = new User();
      user.email = email;
      user.firstname = firstname;
      user.lastname = lastname;
      user.password = password;
      user.hashPassword();

      const token = await generateJwt(user);
      const userRepository = getRepository(User);
      userRepository.save(user);

      return response.json({ success: true, message: 'Usuario registrado', user: user.userInfo, token });
    } catch (error) {
      return response.status(500).json({ success: false, message: 'Error 500' });
    }
  }

  static async revalidateToken(request: Request, response: Response) {
    try {
      const { usuario } = request as any;

      const user = await getRepository(User).findOne({ where: { email: usuario.email } })

      const token = await generateJwt(user);
      return response.json({
        success: true,
        token,
        user: user
      });
    } catch (error) {
      return response.status(500).json({ success: false, message: 'Error 500' });
    }
  }
}

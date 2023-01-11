import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenAuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tokenHeaderKey = process.env.tokenHeaderKey
    const userIdHeaderKey = process.env.userIdHeaderKey
    const jwtSecretKey = process.env.jwtSecretKey
    try {
        const token = req.header(tokenHeaderKey).split(" ")[1];
        const userId = req.header(userIdHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey+":"+userId);
        if(verified){
            next();
        }else{
            return res.status(401).send('error');
        }
    } catch (error) {
        return res.status(401).send(error);
    }
    
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenAuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tokenHeaderKey = 'Authorization'
    const jwtSecretKey = 'gfg_jwt_secret_key'
  
    try {
        const token = req.header(tokenHeaderKey).split(" ")[1];
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            //return res.send("Successfully Verified");
            next();
        }else{
            // Access Denied
            return res.status(401).send('error');
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
    
  }
}

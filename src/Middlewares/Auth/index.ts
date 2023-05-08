import { Request, Response, NextFunction } from 'express'
import { config } from 'dotenv';
config()

function Validate(req: Request, res: Response, next: NextFunction){
  const key = req.headers['x-api-key']
  const domain = req.headers.origin;
  // console.log( key, domain )
  if(
    key ===`${process.env.valid_Key}` 
    ){
      next()
    }else{
      res.status(403).json({error: 'You are Not Allowed!!'})
    }
  };
  // `${process.env.valid_domain}` === domain 
    // &&
  
export default Validate;
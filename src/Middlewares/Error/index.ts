import { Request, Response, NextFunction } from 'express';

type Thandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function ErrorBoundary(handler: Thandler){
  return async (req: Request, res: Response, next: NextFunction)=>{
    try{
      await handler(req, res, next);
    }catch(error){
      next(error);
    }
  };
};

export function ErrorHandler(error: Error, req: Request, res: Response, next: NextFunction){
  console.log('-> ',error.message);
  res.status(500).json({ error: `${error.message}` });
};
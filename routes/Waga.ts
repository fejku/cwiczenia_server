import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  
  // const users = await userDao.getAll();
  // return res.status(OK).json({users});
});

export default router;
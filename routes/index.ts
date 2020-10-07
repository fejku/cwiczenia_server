import { Router } from 'express';
// import UserRouter from './Users';
import WagaRouter from './Waga';

// Init router and path
const router = Router();

// Add sub-routes
// router.use('/users', UserRouter);
router.use('/waga', WagaRouter);

// Export the base-router
export default router;

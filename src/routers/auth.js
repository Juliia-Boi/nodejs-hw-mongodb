import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;

// {
// "email": "boishtyan93@gmail.com"
// }

// {
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUwOWVjM2ZiYWJiMjE2Yjc0YzY2MGIiLCJlbWFpbCI6ImJvaXNodHlhbjkzQGdtYWlsLmNvbSIsImlhdCI6MTczMzM0ODA1NCwiZXhwIjoxNzMzNDM0NDU0fQ.ejbZIVGdamku6-jMNNkWELXWus8N5VPFCfR_L94hxtk",
// "password": "12345"
// }

// {
//   "email": "boishtyan93@gmail.com",
//   "password": "pas123"
// }

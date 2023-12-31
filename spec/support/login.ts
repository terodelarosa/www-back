import { SuperTest, Test, Response } from 'supertest';

import User, { UserRoles } from '@src/models/User';
import UserRepo from '@src/repos/UserRepo';
import PwdUtil from '@src/util/PwdUtil';
import FullPaths from '@src/routes/constants/FullPaths';


// **** Variables **** //

const LoginCreds = {
  email: 'john.smith@gmail.com',
  password: 'Password@1',
  salt: '$2b$12$FE3qWg7qW2l3VdIaIIqgCO'
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
function login(beforeAgent: SuperTest<Test>, done: (arg: string) => void) {
  // Setup dummy data
  const role = UserRoles.Admin,
    pwdHash = PwdUtil.hashSync(LoginCreds.password, LoginCreds.salt),
    loginUser = User.new('john smith', LoginCreds.email, role, pwdHash);
  // Add spy
  spyOn(UserRepo, 'getOne').and.resolveTo(loginUser);
  // Call Login API
  beforeAgent
    .post(FullPaths.Auth.Login)
    .type('form')
    .send(LoginCreds)
    .end((_: Error, res: Response) => {
      const cookie = res.headers['set-cookie'][0];
      return done(cookie);
    });
}


// **** Export default **** //

export default login;

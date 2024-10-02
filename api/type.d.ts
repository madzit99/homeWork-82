export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  googleId?: string; 
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

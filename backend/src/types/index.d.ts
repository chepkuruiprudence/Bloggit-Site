export interface UserPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isDeleted: false;
}

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

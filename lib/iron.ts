import { IronSessionOptions } from 'iron-session';

export const ironOptions: IronSessionOptions = {
  cookieName: 'Ultibets',
  cookieOptions: {
    secure: false,
  },
  password: process.env.NEXT_IRON_PASSWORD as string,
};

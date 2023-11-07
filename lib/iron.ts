import { IronSessionOptions } from 'iron-session';

export const ironOptions: IronSessionOptions = {
  cookieName: 'Ultibets',
  cookieOptions: {
    secure: true,
  },
  password: process.env.NEXT_IRON_PASSWORD as string,
};

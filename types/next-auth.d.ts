import NextAuth, { DefaultSession } from "next-auth"
import { ISODateString } from 'next-auth/src/core/types';

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string;
            emailVerified: ISODateString;
        } & DefaultSession['user'];
    }
}

import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { hashPassword, verifyPassword } from 'lib/password-hashing';
import prisma from 'lib/prisma';

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!password) {
                    throw new Error('Password is required');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                const verifiedPassword = await verifyPassword(password, user?.password || '');
                if (user && verifiedPassword) {
                    return {
                        id: user.id,
                        email: user.email,
                    };
                }

                throw new Error('Invalid email or password');
            },
        }),
        CredentialsProvider({
            id: 'sign-up',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!password) {
                    throw new Error('Password is required');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (user) {
                    throw new Error('Email already exists');
                }

                const hashedPassword = await hashPassword(password);
                const newUser = await prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                    },
                });

                return {
                    id: newUser.id,
                    email: newUser.email,
                };
            },
        })
    ],
    callbacks: {
        async session({ session, trigger, newSession }: {
            session: Session,
            trigger: string,
            newSession: any,
        }) {
            const { email } = session?.user;
            if (!email) {
                return session;
            }

            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                return session;
            }

            return {
                ...session,
                user: {
                    id: user.id,
                    email: user.email,
                }
            };
        }
    },
    pages: {
        signIn: '/sign-in',
    },
    secret: process.env.AUTH_SECRET,
    jwt: {
        maxAge: 60 * 20, // 20 minutes
    },
};

export default NextAuth(authOptions);

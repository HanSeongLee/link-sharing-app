// @ts-ignore
import { hash, compare } from 'bcrypt-ts';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await hash(password, saltRounds);
};

export const verifyPassword = async (submittedPassword: string, hashedPassword: string): Promise<boolean> => {
    return await compare(submittedPassword, hashedPassword);
};

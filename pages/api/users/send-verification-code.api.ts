import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth].api';
import { transporter } from 'lib/nodemailer.client';
import prisma from 'lib/prisma';
import { generateVerificationCode } from 'lib/utils';
import { promises as fs } from 'fs';
import mustache from 'mustache';
import * as path from 'path';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{
        expires: string;
    } | { error: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method Not Allowed',
        });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user.email) {
        return res.status(401).json({
            error: 'Unauthorized',
        });
    }

    const { email, emailVerified } = session.user;
    if (emailVerified) {
        return res.status(400).json({
            error: 'Already Verified',
        });
    }

    const code = generateVerificationCode();
    const now = Date.now();
    const expires = new Date(now + 60 * 3 * 1000).toISOString();

    await prisma.emailVerificationCode.create({
        data: {
            email,
            code,
            expires,
        },
    });

    const templateDirectoryPath = path.resolve(process.cwd(), 'templates/email');
    const templatePath = path.join(templateDirectoryPath, 'email-verification-code.hbs');
    const html = await fs.readFile(templatePath, 'utf-8');
    const emailContents = mustache.render(html.toString(), {
        url: process.env.NEXT_PUBLIC_URL,
        verificationCode: code,
    });

    await transporter.sendMail({
        from: 'devComma<no-reply@devcomma.com>',
        to: email,
        subject: 'Email Verification',
        html: emailContents,
    });

    res.status(200).json({
        expires,
    });
}

export default withSentry(handler);

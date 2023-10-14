import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth].api';
import * as z from 'zod';
import prisma from 'lib/prisma';

const schema = z.object({
    verificationCode: z.string().optional(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{} | { error: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method Not Allowed',
        });
    }

    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: 'Bad Request',
        });
    }
    const { verificationCode } = result.data;

    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user.email) {
        return res.status(401).json({
            error: 'Unauthorized',
        });
    }

    const { email } = session?.user;

    const latestEmailVerificationCodes = await prisma.emailVerificationCode.findMany({
        where: {
            email,
        },
        orderBy: {
            expires: 'desc',
        },
        take: 1,
    });

    if (latestEmailVerificationCodes.length === 0) {
        return res.status(400).json({
            error: 'No verification code',
        });
    }
    const { code, expires } = latestEmailVerificationCodes[0];

    if (verificationCode !== code) {
        return res.status(400).json({
            error: 'Wrong verification code',
        });
    }

    const now = Date.now();
    if (now > expires.getTime()) {
        return res.status(400).json({
            error: 'Expired verification code',
        });
    }

    await prisma.user.update({
        where: {
            email,
        },
        data: {
            emailVerified: new Date().toISOString(),
        },
    });

    res.status(200).json({});
}

export default withSentry(handler);

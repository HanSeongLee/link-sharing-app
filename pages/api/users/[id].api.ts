import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { ISocialLink } from 'types/social-link';
import { IUserProfile } from 'types/user-profile';
import prisma from 'lib/prisma';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IUserProfile | { error: string }>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method Not Allowed',
        });
    }

    const { id } = req.query;

    const user = await prisma.user.findUnique({
        where: {
            id: id as string,
        },
    });

    if (!user) {
        return res.status(404).json({
            error: 'Not Found',
        });
    }

    res.status(200).json({
        id: user.id,
        email: user.email || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        image: user?.image || '',
        socialLinks: user?.socialLinks as unknown as ISocialLink[] || [],
    });
}

export default withSentry(handler);

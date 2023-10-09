import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth].api';
import * as z from 'zod';
import { ISocialLink, SocialPlatform } from 'types/social-link';
import { IUserProfile } from 'types/user-profile';
import prisma from 'lib/prisma';

const schema = z.object({
    avatar: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    socialLinks: z.array(z.object({
        platform: z.nativeEnum(SocialPlatform),
        link: z.string().url(),
    })).optional(),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IUserProfile | { error: string }>
) {
    if (req.method !== 'PATCH') {
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
    const { avatar, firstName, lastName, socialLinks } = result.data;

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({
            error: 'Unauthorized',
        });
    }

    const { id } = session?.user;
    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            image: avatar,
            firstName,
            lastName,
            socialLinks,
        },
    });

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

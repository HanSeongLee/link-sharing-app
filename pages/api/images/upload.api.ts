import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth].api';

const s3 = new S3({
    region: process.env.AWS_S3_REGION as string,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET as string,
    signatureVersion: 'v4',
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method Not Allowed',
        });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({
            error: 'Unauthorized',
        });
    }

    try {
        const { type } = req.body;

        const extension = mime.extension(type);
        const fileParams = {
            Bucket: process.env.AWS_S3_BUCKET as string,
            Fields: {
                key: `${process.env.AWS_S3_IMAGE_BUCKET_KEY}/${uuid()}.${extension}`,
                ContentType: type,
            },
            Expires: 600,
            Conditions: [
                ['content-length-range', 0, 1024 * 1024 * 4], // 4MB
            ],
        };

        const post = s3.createPresignedPost(fileParams);

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export default withSentry(handler);

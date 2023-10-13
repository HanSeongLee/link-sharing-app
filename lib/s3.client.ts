import { createAWSClient } from 'lib/aws.client';
import { S3 } from 'aws-sdk';

const AWS = createAWSClient();
export const s3 = new S3({
    credentials: AWS.config.credentials,
    signatureVersion: 'v4',
});

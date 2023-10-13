import AWS from 'aws-sdk';

const accessKeyId = process.env.PROJECT_AWS_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.PROJECT_AWS_SECRET_ACCESS_KEY || '';
const defaultRegion = process.env.PROJECT_AWS_REGION || '';

export const createAWSClient = (region=defaultRegion) => {
    AWS.config.update({
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
        region,
    });

    return AWS;
};

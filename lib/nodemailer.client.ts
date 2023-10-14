import { createAWSClient } from 'lib/aws.client';
import nodemailer from 'nodemailer';

const AWS = createAWSClient(process.env.PROJECT_AWS_SES_REGION);
export const transporter = nodemailer.createTransport({
    SES: new AWS.SES({
        apiVersion: '2010-12-01',
    }),
});

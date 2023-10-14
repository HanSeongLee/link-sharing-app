import React, { HTMLAttributes, useState } from 'react';
import EmailVerificationForm from 'components/forms/EmailVerificationForm';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMessage } from 'hooks/useMessage';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    defaultExpires?: Date;
}

const EmailVerificationContainer: React.FC<IProps> = ({ defaultExpires, className, ...props }) => {
    const router = useRouter();
    const [alert, setAlert] = useState<string>('');
    const [messageApi, contextHolder] = useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [expires, setExpires] = useState<Date | undefined>(defaultExpires);

    const onSubmit = async (data: {
        verificationCode: string;
    }) => {
        setAlert('');
        setLoading(true);
        try {
            await axios.post('/api/users/verify-email', data);
            router.push('/');
        } catch (e : any | AxiosError) {
            if (axios.isAxiosError(e)) {
                setAlert(e.response?.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    const onResendEmail = async () => {
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post('/api/users/send-verification-code');
            setExpires(new Date(data.expires));
            messageApi.infoMessage({
                iconName: 'email',
                content: 'Email sent successfully.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div {...props}>
            {contextHolder}
            <EmailVerificationForm onSubmit={onSubmit}
                                   onResendEmail={onResendEmail}
                                   alert={alert}
                                   expires={expires}
                                   loading={loading}
            />
        </div>
    );
};

export default EmailVerificationContainer;

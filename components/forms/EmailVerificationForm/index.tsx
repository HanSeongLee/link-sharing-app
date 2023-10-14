import React, { FormHTMLAttributes, useEffect, useMemo, useState } from 'react';
import styles from './style.module.scss';
import Input from 'components/commons/Input';
import Form from 'components/forms/Form';
import Label from 'components/commons/Label';
import Button from 'components/commons/Button';
import Space from 'components/commons/Space';
import { useForm } from 'react-hook-form';
import ActionMessage from 'components/commons/ActionMessage';
import { Paragraph, Text } from 'components/commons/Typography';

interface IProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    expires?: Date;
    onSubmit: (data: {
        verificationCode: string;
    }) => void;
    onResendEmail?: () => void;
    alert?: string;
    loading: boolean;
}

const EmailVerificationForm: React.FC<IProps> = ({
                                                     expires, onSubmit, onResendEmail, loading,
                                                     ...props
                                                 }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            verificationCode: '',
        },
    });
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [isClient, setClient] = useState<boolean>(false);

    const remainingTime = useMemo(() => {
        if (!expires) {
            return '';
        }

        const diff = expires.getTime() - currentDate.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);

        return `${minutes % 60}:${seconds % 60}`;
    }, [expires, currentDate]);

    const isExpired = useMemo(() => {
        if (!expires) {
            return false;
        }

        return currentDate.getTime() > expires.getTime();
    }, [currentDate, expires]);

    useEffect(() => {
        if (!expires) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [expires]);

    useEffect(() => {
        setClient(true);
    }, []);

    return (
        <Form className={styles.form}
              title={'Email Verification'}
              description={`Please check your inbox for verification code sent to your email address.`}
              onSubmit={handleSubmit(onSubmit)}
              {...props}
        >
            <Space gap={24}>
                <Space gap={4}>
                    <Label htmlFor={'email'}>
                        Verification code
                    </Label>
                    <Input id={'verification-code'}
                           type={'text'}
                           placeholder={'Enter your verification code'}
                           icon={{
                               name: 'password',
                               color: 'grey',
                           }}
                           {...register('verificationCode')}
                    />
                    {((isClient && expires) &&
                        (!isExpired ? (
                            <Paragraph align={'right'}>
                                <Text size={'small'}
                                      type={'danger'}
                                >
                                    Remaining time: {remainingTime}
                                </Text>
                            </Paragraph>
                        ) : (
                            <Paragraph align={'right'}>
                                <Text size={'small'}
                                      type={'danger'}
                                >
                                    Expired, request resend email.
                                </Text>
                            </Paragraph>
                        ))
                    )}
                </Space>

                <Button type={'submit'}
                        disabled={loading || isExpired}
                >
                    Verify
                </Button>

                <Paragraph align={'center'}>
                    <Text size={'small'}>
                        Can't find it? Please check your spam folder.
                    </Text>
                </Paragraph>

                <ActionMessage message={`Don't you have the email?`}
                               actionName={'Resend email'}
                               onClick={onResendEmail}
                />
            </Space>
        </Form>
    );
};

export default EmailVerificationForm;

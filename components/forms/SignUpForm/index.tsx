import React, { FormHTMLAttributes } from 'react';
import styles from './style.module.scss';
import Form from 'components/forms/Form';
import Space from 'components/commons/Space';
import Label from 'components/commons/Label';
import Input from 'components/commons/Input';
import Paragraph from 'components/commons/Typography/Paragraph';
import Button from 'components/commons/Button';
import { useForm } from 'react-hook-form';
import { ERROR_MESSAGES } from 'constants/messages';
import ActionMessage from 'components/commons/ActionMessage';

interface IProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    onSubmit: (data: {
        email: string;
        password: string;
        confirmPassword: string;
    }) => void;
    alert: string;
    loading: boolean;
}

const SignUpForm: React.FC<IProps> = ({ onSubmit, loading, className, ...props }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    return (
        <Form className={styles.form}
              title={'Create account'}
              description={'Let’s get you started sharing your links!'}
              onSubmit={handleSubmit(onSubmit)}
              {...props}
        >
            <Space gap={24}>
                <Space gap={4}>
                    <Label htmlFor={'email'}>
                        Email address
                    </Label>
                    <Input id={'email'}
                           type={'email'}
                           placeholder={'e.g. alex@email.com'}
                           icon={{
                               name: 'email',
                               color: 'grey',
                           }}
                           {...register('email', {
                               required: ERROR_MESSAGES.REQUIRE_FILED,
                           })}
                           error={errors.email?.message}
                           autoComplete={'email'}
                    />
                </Space>
                <Space gap={4}>
                    <Label htmlFor={'password'}>
                        Create password
                    </Label>
                    <Input id={'password'}
                           type={'password'}
                           placeholder={'At least .8 characters'}
                           icon={{
                               name: 'password',
                               color: 'grey',
                           }}
                           {...register('password', {
                               required: ERROR_MESSAGES.REQUIRE_FILED,
                               validate: (value: string) => {
                                   if (watch('confirmPassword') !== value) {
                                       return ERROR_MESSAGES.PASSWORD_NOT_MATCH;
                                   }
                               }
                           })}
                           error={errors.password?.message}
                           autoComplete={'new-password'}
                    />
                </Space>
                <Space gap={4}>
                    <Label htmlFor={'confirm-password'}>
                        Confirm password
                    </Label>
                    <Input id={'confirm-password'}
                           type={'password'}
                           placeholder={'At least .8 characters'}
                           icon={{
                               name: 'password',
                               color: 'grey',
                           }}
                           {...register('confirmPassword', {
                               required: ERROR_MESSAGES.REQUIRE_FILED,
                           })}
                           autoComplete={'off'}
                    />
                </Space>

                <Paragraph size={'small'}>
                    Password must contain at least 8 characters
                </Paragraph>

                <Button type={'submit'}
                        disabled={loading}
                >
                    Create new account
                </Button>

                <ActionMessage message={`Already have an account?`}
                               actionName={'Login'}
                               href={'/sign-in'}
                />
            </Space>
        </Form>
    );
};

export default SignUpForm;

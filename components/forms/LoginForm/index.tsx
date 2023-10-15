import React, { FormHTMLAttributes } from 'react';
import styles from './style.module.scss';
import Input from 'components/commons/Input';
import Form from 'components/forms/Form';
import Label from 'components/commons/Label';
import Button from 'components/commons/Button';
import Space from 'components/commons/Space';
import { useForm } from 'react-hook-form';
import ActionMessage from 'components/commons/ActionMessage';
import { ERROR_MESSAGES } from 'constants/messages';

interface IProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    onSubmit: (data: {
        email: string;
        password: string;
    }) => void;
    alert: string;
    loading: boolean;
}

const LoginForm: React.FC<IProps> = ({ onSubmit, loading, ...props }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <Form className={styles.form}
              title={'Login'}
              description={'Add your details below to get back into the app'}
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
                               name: 'link',
                               color: 'grey',
                           }}
                           {...register('email', {
                               required: ERROR_MESSAGES.REQUIRE_FILED,
                           })}
                           error={errors.email?.message}
                    />
                </Space>
                <Space gap={4}>
                    <Label htmlFor={'password'}>
                        Password
                    </Label>
                    <Input id={'password'}
                           type={'password'}
                           placeholder={'Enter your password'}
                           icon={{
                               name: 'password',
                               color: 'grey',
                           }}
                           {...register('password', {
                               required: ERROR_MESSAGES.REQUIRE_FILED,
                           })}
                           error={errors.password?.message}
                    />
                </Space>

                <Button type={'submit'}
                        disabled={loading}
                >
                    Login
                </Button>

                <ActionMessage message={`Don't have an account?`}
                               actionName={'Create account'}
                               href={'/sign-up'}
                />
            </Space>
        </Form>
    );
};

export default LoginForm;

import React, { HTMLAttributes, useState } from 'react';
import LoginForm from 'components/forms/LoginForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const LoginContainer: React.FC<IProps> = ({ className, ...props }) => {
    const [error, setError] = React.useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (data: {
        email: string;
        password: string;
    }) => {
        setError('');
        setLoading(true);

        const { email, password } = data;
        const response = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (!response?.error) {
            router.push('/');
        } else {
            setError(response.error);
            setLoading(false);
        }
    };

    return (
        <div className={className}
             {...props}
        >
            <LoginForm onSubmit={onSubmit}
                       alert={error}
                       loading={loading}
            />
        </div>
    );
};

export default LoginContainer;

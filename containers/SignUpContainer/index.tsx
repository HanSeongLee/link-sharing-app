import React, { HTMLAttributes, useState } from 'react';
import SignUpForm from 'components/forms/SignUpForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const SignUpContainer: React.FC<IProps> = ({ className, ...props }) => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (data: {
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        setError('');
        setLoading(true);

        const { email, password } = data;
        const response = await signIn('sign-up', {
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
            <SignUpForm onSubmit={onSubmit}
                        alert={error}
                        loading={loading}
            />
        </div>
    );
};

export default SignUpContainer;

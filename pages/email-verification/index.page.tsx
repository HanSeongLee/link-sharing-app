import type { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next';
import styles from './style.module.scss';
import Container from 'components/commons/Container';
import Logo from 'components/commons/Logo';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth].api';
import EmailVerificationContainer from 'containers/EmailVerificationContainer';
import axios from 'axios';

const EmailVerificationPage = ({ expires }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Container size={'large'}>
                    <Logo />
                </Container>
            </header>
            <main>
                <Container className={styles.container}
                           size={'small'}
                >
                    <EmailVerificationContainer defaultExpires={expires ? new Date(expires) : undefined} />
                </Container>
            </main>
        </div>
    );
};

export const getServerSideProps = (async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session || !session.user.email) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            },
        };
    }

    const { email, emailVerified } = session.user;
    if (emailVerified) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const verificationCodeExists = await prisma.emailVerificationCode.findFirst({
        where: {
            email,
        },
    });

    if (!verificationCodeExists) {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/users/send-verification-code`, {}, {
            headers: {
                cookie: context.req.headers.cookie,
            },
        });
        return {
            props: {
                expires: data.expires,
            },
        };
    }

    return {
        props: {},
    };
}) satisfies GetServerSideProps<{
    expires?: string,
}>;

export default EmailVerificationPage;

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import styles from './style.module.scss';
import Container from 'components/commons/Container';
import Logo from 'components/commons/Logo';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth].api';
import LoginContainer from 'containers/LoginContainer';

const SignInPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
                    <LoginContainer />
                </Container>
            </main>
        </div>
    );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default SignInPage;

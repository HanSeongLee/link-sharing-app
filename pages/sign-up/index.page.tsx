import type { NextPage } from 'next'
import styles from './style.module.scss';
import Container from 'components/commons/Container';
import Logo from 'components/commons/Logo';
import SignUpContainer from 'containers/SignUpContainer';

const SignUpPage: NextPage = () => {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Container size={'large'}>
                    <Logo />
                </Container>
            </header>
            <main>
                <Container className={styles.container}
                           size={'large'}
                >
                    <SignUpContainer />
                </Container>
            </main>
        </div>
    );
}

export default SignUpPage;

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from './style.module.scss';
import Container from 'components/commons/Container';
import EditorHeaderContainer from 'containers/EditorHeaderContainer';
import Space from 'components/commons/Space';
import UserProfileEditorContainer from 'containers/UserProfileEditorContainer';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth].api';
import SignOutContainer from 'containers/SignOutContainer';
import { ISocialLink } from 'types/social-link';
import { IUserProfile } from 'types/user-profile';
import prisma from 'lib/prisma';

const EditorPage = ({ userProfile }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Space className={styles.page}
               responsiveGap={{
                   row: {
                       sm: 16,
                       md: 24,
                       lg: 24,
                   },
               }}
        >
            <EditorHeaderContainer className={styles.editorHeaderContainer} />
            <main>
                <Container size={'large'}>
                    <Space gap={24}>
                        <UserProfileEditorContainer userProfile={userProfile} />
                        <SignOutContainer />
                    </Space>
                </Container>
            </main>
        </Space>
    );
};

export const getServerSideProps = (async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            },
        };
    }

    const { id, emailVerified } = session.user;

    if (!emailVerified) {
        return {
            redirect: {
                destination: '/email-verification',
                permanent: false,
            },
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    if (!user || !user.email) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            userProfile: {
                id: user.id,
                image: user.image || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email,
                socialLinks: user.socialLinks as unknown as ISocialLink[] || [],
            },
        },
    };
}) satisfies GetServerSideProps<{
    userProfile: IUserProfile;
}>;

export default EditorPage;

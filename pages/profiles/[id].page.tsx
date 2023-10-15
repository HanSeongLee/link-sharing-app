import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import styles from './style.module.scss';
import Space from 'components/commons/Space';
import ProfileHeader from 'components/commons/ProfileHeader';
import Profile from 'components/commons/Profile';
import { createGlobalStyle } from 'styled-components';
import { ISocialLink } from 'types/social-link';
import { IUserProfile } from 'types/user-profile';
import prisma from 'lib/prisma';
import Head from 'next/head';

const ProfilesPage = ({ userProfile }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <Head>
                <title>{`${userProfile.firstName} ${userProfile.lastName}`} | devlinks</title>
            </Head>
            <GlobalStyles />
            <Space className={styles.page}
                   responsiveGap={{
                       row: {
                           sm: 16,
                           md: 24,
                           lg: 24,
                       },
                   }}
            >
                <main className={styles.main}>
                    <ProfileHeader link={`${process.env.NEXT_PUBLIC_URL}/profiles/${userProfile.id}`} />
                    <Profile avatar={userProfile.image === null ? undefined : userProfile.image}
                             firstName={userProfile.firstName || ''}
                             lastName={userProfile.lastName || ''}
                             email={userProfile.email}
                             socialLinks={userProfile.socialLinks.map((props, index) => {
                                 return {
                                     id: index,
                                     ...props,
                                 };
                             })}
                    />
                </main>
            </Space>
        </>
    );
};

const GlobalStyles = createGlobalStyle({
    'html, body': {
        backgroundColor: 'var(--color-white)',
    },
});

export const getServerSideProps = (async (context) => {
    const { id } = context.params as { id: string };

    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    if (!user || !user.firstName || !user.lastName || !user.email) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            userProfile: {
                id: user.id,
                image: user.image || '',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                socialLinks: user.socialLinks as unknown as ISocialLink[] || [],
            },
        },
    };
}) satisfies GetServerSideProps<{
    userProfile: IUserProfile;
}>;

export default ProfilesPage;

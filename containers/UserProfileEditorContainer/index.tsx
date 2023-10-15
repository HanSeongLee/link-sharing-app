import React, { HTMLAttributes, useEffect, useState } from 'react';
import UserLinkForm from 'components/forms/UserLinkForm';
import UserProfileDetailsForm from 'components/forms/UserProfileDetailsForm';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher, loadFileAsDataURL } from 'lib/utils';
import { IUserProfile } from 'types/user-profile';
import { useMessage } from 'hooks/useMessage';
import { ERROR_MESSAGES, INFO_MESSAGES } from 'constants/messages';
import Space from 'components/commons/Space';
import Preview from 'components/commons/Preview';
import { FormProvider, useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { useMediaQueries } from 'hooks/useMediaQueries';
import { useWarnIfUnsavedChanges } from 'hooks/useWarnIfUnsavedChanges';
import { ISocialLink } from 'types/social-link';
import imageCompression from 'browser-image-compression';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    userProfile: IUserProfile;
}

const UserProfileEditorContainer: React.FC<IProps> = ({ userProfile, ...props }) => {
    const router = useRouter();
    const { tab } = router.query;
    const { data: session, update } = useSession();
    const { data, error, isLoading, mutate } = useSWR<IUserProfile>(session?.user.id ? `/api/users/${session?.user.id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fallbackData: userProfile,
    });
    const [messageApi, contextHolder] = useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const userProfileLinkForm = useForm<{
        links: ISocialLink[],
    }>({
        defaultValues: {
            links: data?.socialLinks || [],
        },
    });
    const userProfileDetailsForm = useForm<{
        image: string | FileList,
        firstName: string,
        lastName: string,
        email: string,
    }>({
        defaultValues: {
            image: data?.image || '',
            firstName: data?.firstName || '',
            lastName: data?.lastName || '',
            email: data?.email || '',
        },
    });
    const links = userProfileLinkForm.watch('links');
    const [image, firstName, lastName] = userProfileDetailsForm.watch(['image', 'firstName', 'lastName']);
    const [avatar, setAvatar] = useState<string | ArrayBuffer | null>();
    const { desktopQuery } = useMediaQueries();

    const showSaveMessage = () => {
        messageApi.infoMessage({
            iconName: 'changes-saved',
            content: INFO_MESSAGES.CHANGED_SAVE,
        });
    };

    const showErrorMessage = () => {
        messageApi.errorMessage({
            content: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        });
    };

    const onUserLinkFormSubmit = async (data: FieldValues) => {
        const { links } = data;

        setLoading(true);
        try {
            const { data: response } = await axios.patch('/api/users/me', {
                socialLinks: links,
            });

            await mutate({ ...response });
            userProfileLinkForm.reset({
                links: response.socialLinks,
            }, {
                keepValues: true,
            });
            showSaveMessage();
        } catch (e) {
            showErrorMessage();
        } finally {
            setLoading(false);
        }
    };

    const compressImage = async (file: File) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/webp',
            initialQuality: 0.7,
        };

        return await imageCompression(file, options);
    };

    const uploadImage = async (file: File) => {
        const { data } = await axios.post('/api/images/upload', {
            name: file.name,
            type: file.type,
        });

        const { url, fields } = data;
        const formData = new FormData();
        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        await axios.post(url, formData);
        return `${url}/${fields.key}`;
    };

    const onUserProfileDetailsFormSubmit = async (data: FieldValues) => {
        const { image } = data;
        let avatarUrl = undefined;

        setLoading(true);
        try {
            if (typeof image !== 'string') {
                const compressedImage = await compressImage(image[0]);
                avatarUrl = await uploadImage(compressedImage);
            }

            const { data: response } = await axios.patch('/api/users/me', {
                avatar: avatarUrl,
                firstName: data.firstName,
                lastName: data.lastName,
            });

            await mutate({ ...response });
            await update();
            userProfileDetailsForm.reset({
                image: '',
                firstName: response?.firstName || '',
                lastName: response?.lastName || '',
                email: response?.email || '',
            }, {
                keepValues: true,
            });
            showSaveMessage();
        } catch (e) {
            showErrorMessage();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!image || typeof image === 'string' || image.length === 0) {
            return ;
        }

        loadFileAsDataURL(image[0], (e) => {
            if (!e.target) {
                return ;
            }

            setAvatar(e.target.result);
        });
    }, [image]);

    useWarnIfUnsavedChanges(userProfileLinkForm.formState.isDirty || userProfileDetailsForm.formState.isDirty, () => {
        if (confirm('Are you sure you want to leave? You have unsaved changes that will be lost.')) {
            if (userProfileLinkForm.formState.isDirty) {
                userProfileLinkForm.reset();
            } else if (userProfileDetailsForm.formState.isDirty) {
                setAvatar(null);
                userProfileDetailsForm.reset();
            }
            return true;
        }
        return false;
    });

    if (!data || isLoading || error) {
        return null;
    }

    return (
        <Space direction={'horizontal'}
               gap={24}
               {...props}
        >
            {contextHolder}
            {desktopQuery && (
                <Preview avatar={avatar as string || data?.image || ''}
                         firstName={firstName || data?.firstName || ''}
                         lastName={lastName || data?.lastName || ''}
                         email={data?.email || ''}
                         socialLinks={links || data?.socialLinks || []}
                         hideSocialLinkEmptyBox={tab === 'profile-details'}
                />
            )}
            {(!tab || tab === 'link') && (
                <FormProvider {...userProfileLinkForm}>
                    <UserLinkForm onSubmit={onUserLinkFormSubmit}
                                  loading={loading}
                    />
                </FormProvider>
            )}
            {tab === 'profile-details' && (
                <FormProvider {...userProfileDetailsForm}>
                    <UserProfileDetailsForm onSubmit={onUserProfileDetailsFormSubmit}
                                            loading={loading}
                    />
                </FormProvider>
            )}
        </Space>
    );
};

export default UserProfileEditorContainer;

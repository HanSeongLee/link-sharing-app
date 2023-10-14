import React, { FormHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Form from 'components/forms/Form';
import Button from 'components/commons/Button';
import Space from 'components/commons/Space';
import Divider from 'components/commons/Divider';
import Label from 'components/commons/Label';
import Input from 'components/commons/Input';
import ImageUpload from 'components/commons/ImageUpload';
import { Paragraph } from 'components/commons/Typography';
import { useFormContext } from 'react-hook-form';
import { ERROR_MESSAGES } from 'constants/messages';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { IUserProfile } from 'types/user-profile';

interface IProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    onSubmit: (data: FieldValues) => void;
    alert?: string;
    loading?: boolean;
}

const UserProfileDetailsForm: React.FC<IProps> = ({ onSubmit, loading = false, className, ...props }) => {
    const {
        register, handleSubmit, formState: { errors, isDirty, defaultValues },
    } = useFormContext<Omit<IUserProfile, 'id' | 'socialLinks'>>();

    return (
        <Form className={cn(styles.form, className)}
              title={'Profile Details'}
              description={'Add your details to create a personal touch to your profile.'}
              onSubmit={handleSubmit(onSubmit)}
              {...props}
        >
            <Space className={styles.content}
                   gap={24}
            >
                <Space className={cn(styles.box, styles.field)}
                       gap={16}
                >
                    <Paragraph className={styles.label}>
                        Profile picture
                    </Paragraph>
                    <Space className={styles.field}
                           gap={24}
                    >
                        <ImageUpload {...register('image')}
                                     defaultValue={defaultValues?.image || ''}
                        />
                        <Paragraph className={styles.description}
                                   size={'small'}
                        >
                            Image must be below 1024x1024px. Use PNG or JPG format.
                        </Paragraph>
                    </Space>
                </Space>

                <Space className={styles.box}
                       gap={12}
                >
                    <Space className={styles.field}
                           gap={4}
                    >
                        <Label className={styles.label}
                               htmlFor={'first-name'}
                               required
                        >
                            First name
                        </Label>
                        <Input className={styles.input}
                               id={'first-name'}
                               type={'text'}
                               placeholder={'e.g. John'}
                               {...register('firstName', {
                                   required: ERROR_MESSAGES.REQUIRE_FILED,
                               })}
                               error={errors.firstName?.message}
                        />
                    </Space>
                    <Space className={styles.field}
                           gap={4}
                    >
                        <Label className={styles.label}
                               htmlFor={'last-name'}
                               required
                        >
                            Last name
                        </Label>
                        <Input className={styles.input}
                               id={'last-name'}
                               type={'text'}
                               placeholder={'e.g. Appleseed'}
                               {...register('lastName', {
                                   required: ERROR_MESSAGES.REQUIRE_FILED,
                               })}
                               error={errors.lastName?.message}
                        />
                    </Space>
                    <Space className={styles.field}
                           gap={4}
                    >
                        <Label className={styles.label}
                               htmlFor={'email'}>
                            Email
                        </Label>
                        <Input className={styles.input}
                               id={'email'}
                               type={'email'}
                               placeholder={'e.g. email@example.com'}
                               readOnly
                               {...register('email')}
                        />
                    </Space>
                </Space>
            </Space>

            <div className={styles.footer}>
                <Divider />

                <Space className={styles.buttonContainer}>
                    <Button className={styles.button}
                            type={'submit'}
                            disabled={loading || !isDirty}
                    >
                        Save
                    </Button>
                </Space>
            </div>
        </Form>
    );
};

export default UserProfileDetailsForm;

import React, { FormHTMLAttributes } from 'react';
import styles from './style.module.scss';
import Form from 'components/forms/Form';
import Button from 'components/commons/Button';
import Space from 'components/commons/Space';
import EmptyUserLinkBox from 'components/commons/EmptyUserLinkBox';
import Divider from 'components/commons/Divider';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import FieldBox from 'components/commons/FieldBox';
import Label from 'components/commons/Label';
import Select from 'components/commons/Select';
import { SOCIAL_LINKS } from 'constants/social-links';
import Input from 'components/commons/Input';
import { ISocialLink, SocialPlatform } from 'types/social-link';
import { ERROR_MESSAGES } from 'constants/messages';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import cn from 'classnames';

interface IProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'defaultValue'> {
    onSubmit: (data: FieldValues) => void;
    loading?: boolean;
}

const UserLinkForm: React.FC<IProps> = ({ onSubmit, loading = false, className, ...props }) => {
    const {
        register, handleSubmit, control, formState: { errors, isDirty },
    } = useFormContext<{
        links: ISocialLink[];
    }>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'links',
    });

    const handleAddNewLink = () => {
        append({
            platform: SocialPlatform.Github,
            link: '',
        });
    };

    const handleRemoveLink = (index: number) => {
        remove(index);
    };

    return (
        <Form className={cn(styles.form, className)}
              title={'Customize your links'}
              description={'Add/edit/remove links below and then share all your profiles with the world!'}
              onSubmit={handleSubmit(onSubmit)}
              {...props}
        >
            <Space className={styles.content}
                   gap={24}
            >
                <Button type={'button'}
                        variant={'secondary'}
                        onClick={handleAddNewLink}
                >
                    + Add new link
                </Button>

                {fields.length > 0 ? (
                    <Space className={styles.fieldContainer}
                           gap={24}
                    >
                        {fields.map((item, index) => (
                            <FieldBox title={`Link #${index + 1}`}
                                      onRemove={() => handleRemoveLink(index)}
                                      key={index}
                            >
                                <Space gap={4}>
                                    <Label htmlFor={`links.${index}.platform`}>
                                        Platform
                                    </Label>
                                    <Controller control={control}
                                                name={`links.${index}.platform`}
                                                render={({ field: { ref, ...props } }) => (
                                                    <Select id={`links.${index}.platform`}
                                                            defaultValue={props.value || 'github'}
                                                            options={Object.keys(SOCIAL_LINKS)
                                                                .map((key) => {
                                                                    return {
                                                                        value: key,
                                                                        label: SOCIAL_LINKS[key as SocialPlatform].name,
                                                                        iconName: key as IconName,
                                                                    };
                                                                })}
                                                            {...props}

                                                    />
                                                )}
                                    />
                                </Space>
                                <Space gap={4}>
                                    <Label htmlFor={`links.${index}.link`}>
                                        Link
                                    </Label>
                                    <Input id={`links.${index}.link`}
                                           type={'url'}
                                           icon={{
                                               name: 'link',
                                           }}
                                           placeholder={'e.g. https://www.github.com/johnappleseed'}
                                           {...register(`links.${index}.link`, {
                                               required: ERROR_MESSAGES.REQUIRE_FILED,
                                               pattern: {
                                                   value: /^(ftp|http|https):\/\/[^ "]+$/,
                                                   message: ERROR_MESSAGES.INVALID_URL,
                                               },
                                           })}
                                           error={errors.links?.[index]?.link?.message}
                                    />
                                </Space>
                            </FieldBox>
                        ))}
                    </Space>
                ) : (
                    <EmptyUserLinkBox />
                )}
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

export default UserLinkForm;

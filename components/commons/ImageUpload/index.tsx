import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Icon from 'components/commons/Icon';
import { useForwardRef } from 'hooks/useForwardRef';
import { loadFileAsDataURL } from 'lib/utils';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {

}

const ImageUpload = React.forwardRef<HTMLInputElement, IProps>(({ defaultValue, onChange, className, ...props }, ref) => {
    const forwardedRef = useForwardRef<HTMLInputElement>(ref);
    const [image, setImage] = useState<null | ArrayBuffer | string>(defaultValue as string);

    const handleClickUploadButton = () => {
        forwardedRef.current?.click();
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
        if (!event.target.files) {
            return;
        }

        const file = event.target.files[0];
        setImage(null);

        if (!file) {
            return;
        }

        loadFileAsDataURL(file, (e) => {
            if (!e.target) {
                return;
            }

            setImage(e.target.result);
        });
    };

    return (
        <div className={cn(styles.imageUpload, className)}>
            <button className={styles.uploadButton}
                    type={'button'}
                    onClick={handleClickUploadButton}
                    style={image ? {
                        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${image}) center, lightgray 50%`,
                        backgroundSize: 'cover',
                        color: 'var(--color-white)',
                    } : undefined}
            >
                <Icon name={'upload-image'}
                      color={image ? 'white' : 'primary'}
                      size={40}
                />
                {image ? 'Change Image' : '+ Upload Image'}
            </button>
            <input type={'file'}
                   accept={'image/jpeg, image/png'}
                   ref={forwardedRef}
                   hidden
                   {...props}
                   onChange={handleImageUpload}
            />
        </div>
    );
});

export default ImageUpload;

import React, { InputHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { Text } from 'components/commons/Typography';
import Icon from 'components/commons/Icon';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: IIcon;
    error?: string;
    active?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, IProps>(({
                                                              icon, error, active, className,
                                                              ...props
                                                          }, ref) => {
    return (
        <div className={cn(styles.inputWrapper, {
            [styles.error]: !!error,
            [styles.active]: active,
        }, className)}
        >
            {icon && (
                <Icon className={styles.icon}
                      {...icon}
                />
            )}
            <input className={styles.input}
                   ref={ref}
                   {...props}
            />
            <Text className={styles.errorText}
                  type={'danger'}
                  size={'small'}
            >
                {error ? error : 'Please check again'}
            </Text>
        </div>
    );
});

export default Input;

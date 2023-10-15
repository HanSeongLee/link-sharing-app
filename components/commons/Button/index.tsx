import React, { ElementType } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps<T extends ElementType = 'button' | 'a'> {
    as?: T;
    variant?: 'primary' | 'secondary' | 'link';
    className?: string;
    href?: string;
    onClick?: () => void;
    alt?: string;
    type?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

const Button: React.FC<IProps> = ({
                                      as = 'button', variant = 'primary', className, children,
                                      ...props
                                  }) => {
    return React.createElement(
        as,
        {
            className: cn(styles.button, {
                [styles.primary]: variant === 'primary',
                [styles.secondary]: variant === 'secondary',
                [styles.link]: variant === 'link',
            }, className),
            ...props,
        },
        children
    );
};

export default Button;

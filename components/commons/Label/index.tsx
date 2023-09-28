import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    required?: boolean;
}

const Label: React.FC<IProps> = ({ required, className, children, ...props }) => {
    return (
        <label className={cn(styles.label, {
            [styles.required]: required,
        }, className)}
               {...props}
        >
            {children}
        </label>
    );
};

export default Label;

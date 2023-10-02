import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    message: string;
    type: 'error';
}

const Alert: React.FC<IProps> = ({ message, type, className, ...props }) => {
    return (
        <div className={cn(styles.alert, {
            [styles.error]: type === 'error',
        }, className)}
             {...props}
        >
            {message}
        </div>
    );
};

export default Alert;

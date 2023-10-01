import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLHRElement> {

}

const Divider: React.FC<IProps> = ({ className, ...props }) => {
    return (
        <hr className={cn(styles.divider, className)}
            {...props}
        />
    );
};

export default Divider;

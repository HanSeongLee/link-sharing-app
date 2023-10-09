import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Icon from 'components/commons/Icon';
import { IMessage } from 'types/message';

interface IProps extends HTMLAttributes<HTMLDivElement>, IMessage {

}

const Message: React.FC<IProps> = ({
                                       type, iconName, content, className,
                                       children, ...props
                                   }) => {
    return (
        <div className={cn(styles.message, {
            [styles.error]: type === 'error',
        }, className)}
             {...props}
        >
            {iconName && (
                <Icon name={iconName}
                      size={20}
                />
            )}
            <span className={styles.content}>
                {content}
            </span>
        </div>
    );
};

export default Message;

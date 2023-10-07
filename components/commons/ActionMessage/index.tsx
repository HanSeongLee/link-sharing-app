import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { Paragraph, Text } from 'components/commons/Typography';
import Button from 'components/commons/Button';
import Link from 'next/link';

interface IProps extends HTMLAttributes<HTMLDivElement>{
    message: string;
    actionName: string;
    onAction?: () => void;
    href?: string;
    external?: boolean;
}

const ActionMessage: React.FC<IProps> = ({
                                             message, actionName, onAction, href,
                                             external=false, className, children, ...props
                                         }) => {
    return (
        <Paragraph className={cn(styles.actionMessage, className)}
                   {...props}
        >
            <span>
                {message}
            </span>

            {(href && !external) ? (
                <Link onClick={onAction}
                      href={href}
                >
                    <Text type={'primary'}>
                        {actionName}
                    </Text>
                </Link>
            ) : (
                <Button as={href ? 'a' : 'button'}
                        type={'button'}
                        variant={'link'}
                        onClick={onAction}
                        href={href}
                >
                    <Text type={'primary'}>
                        {actionName}
                    </Text>
                </Button>
            )}
        </Paragraph>
    );
};

export default ActionMessage;

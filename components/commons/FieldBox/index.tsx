import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Space from 'components/commons/Space';
import Icon from 'components/commons/Icon';
import Button from 'components/commons/Button';
import { Text } from 'components/commons/Typography';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    onRemove: () => void;
}

const FieldBox: React.FC<IProps> = ({
                                        title, onRemove, className, children,
                                        ...props
                                    }) => {
    return (
        <Space className={cn(styles.fieldBox, className)}
               gap={12}
               {...props}
        >
            <Space direction={'horizontal'}
                   align={'center'}
                   justify={'space-between'}
            >
                <Space direction={'horizontal'}
                       align={'center'}
                       gap={8}
                >
                    <Icon name={'drag-and-drop'}
                          color={'grey'}
                          size={12}
                    />
                    <Text type={'default'}
                          strong
                    >
                        {title}
                    </Text>
                </Space>

                <Button type={'button'}
                        variant={'link'}
                        onClick={onRemove}
                >
                    Remove
                </Button>
            </Space>

            {children}
        </Space>
    );
};

export default FieldBox;

import React, { FormHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { Title } from 'components/commons/Typography';
import Paragraph from 'components/commons/Typography/Paragraph';
import Space from 'components/commons/Space';
import Alert from 'components/commons/Alert';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
    title?: string;
    description?: string;
    alert?: string;
}

const Form: React.FC<IProps> = ({
                                    title, description, alert, className,
                                    children, ...props
                                }) => {
    return (
        <form className={cn(styles.form, className)}
              {...props}
        >
            {(title || description) && (
                <Space className={styles.head}
                       gap={8}
                >
                    {title && (
                        <Title className={styles.title}
                               level={1}
                               size={'medium'}
                        >
                            {title}
                        </Title>
                    )}
                    {description && (
                        <Paragraph className={styles.description}>
                            {description}
                        </Paragraph>
                    )}
                </Space>
            )}
            <Space className={styles.content}
                   gap={24}
            >
                {alert && (
                    <Alert message={alert}
                           type={'error'}
                    />
                )}
                {children}
            </Space>
        </form>
    );
};

export default Form;

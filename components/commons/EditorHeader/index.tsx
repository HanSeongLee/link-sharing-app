import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Container from 'components/commons/Container';
import Logo from 'components/commons/Logo';
import Button from 'components/commons/Button';
import Icon from 'components/commons/Icon';
import Tabs from 'components/commons/Tabs';
import { useMediaQueries } from 'hooks/useMediaQueries';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    tabItems?: ITabsItem[];
    activeTabKey?: string;
    onChangeTab?: (key: string) => void;
    onClickPreview?: () => void;
}

const EditorHeader: React.FC<IProps> = ({
                                         tabItems, activeTabKey, onChangeTab, onClickPreview,
                                         className, ...props
                                     }) => {
    const { mobileQuery } = useMediaQueries();

    return (
        <header className={cn(styles.appHeader, className)}
                {...props}
        >
            <Container className={styles.container}>
                <Logo size={mobileQuery ? 'small' : 'medium'} />

                {tabItems && (
                    <Tabs items={tabItems}
                          activeKey={activeTabKey}
                          onChange={onChangeTab}
                    />
                )}

                <Button className={styles.previewButton}
                        type={'button'}
                        variant={'secondary'}
                        arial-label={'Preview'}
                        onClick={onClickPreview}
                >
                    {mobileQuery ? (
                            <Icon name={'preview-header'}
                                  color={'primary'}
                                  size={20}
                            />
                        ) :
                        'Preview'
                    }
                </Button>
            </Container>
        </header>
    );
};

export default EditorHeader;

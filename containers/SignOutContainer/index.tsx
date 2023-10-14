import React, { HTMLAttributes } from 'react';
import Space from 'components/commons/Space';
import { Paragraph, Text } from 'components/commons/Typography';
import { signOut } from 'next-auth/react';
import Button from 'components/commons/Button';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const SignOutContainer: React.FC<IProps> = ({ ...props }) => {

    const handleSignOut = () => {
        signOut();
    };

    return (
        <Space direction={'horizontal'}
               gap={8}
               align={'center'}
               justify={'center'}
               {...props}
        >
            <Paragraph>
                <span>
                    Do you want to sign out?
                </span>&nbsp;

                <Button type={'button'}
                        variant={'link'}
                        onClick={handleSignOut}
                >
                    <Text type={'primary'}>
                        Sign out
                    </Text>
                </Button>
            </Paragraph>
        </Space>
    );
};

export default SignOutContainer;

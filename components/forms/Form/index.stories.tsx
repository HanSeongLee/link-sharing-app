import { Meta, StoryObj } from '@storybook/react';
import Form from './index';
import Button from 'components/commons/Button';
import Input from 'components/commons/Input';
import Label from 'components/commons/Label';
import Space from 'components/commons/Space';

const meta: Meta<typeof Form> = {
    title: 'Components/Form',
    component: Form,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
    args: {
        title: 'Form',
        description: 'Description',
        alert: 'Error Message',
        children: (
            <>
                <Space gap={4}>
                    <Label htmlFor={'email'}>
                        Email
                    </Label>
                    <Input id={'email'}
                           name={'email'}
                           type={'email'}
                           placeholder={'Email'}
                    />
                </Space>
                <Button type={'submit'}>
                    Submit
                </Button>
            </>
        )
    },
};

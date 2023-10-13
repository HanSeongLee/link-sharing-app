import { Meta, StoryObj } from '@storybook/react';
import LoginForm from './index';

const meta: Meta<typeof LoginForm> = {
    title: 'Components/Form/LoginForm',
    component: LoginForm,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
    args: {
    },
};

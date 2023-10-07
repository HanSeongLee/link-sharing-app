import { Meta, StoryObj } from '@storybook/react';
import ActionMessage from './index';

const meta: Meta<typeof ActionMessage> = {
    title: 'Components/ActionMessage',
    component: ActionMessage,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof ActionMessage>;

export const CreateAccount: Story = {
    args: {
        message: `Don't have an account?`,
        actionName: 'Create account',
        href: '/sign-up',
    },
};

export const Login: Story = {
    args: {
        message: `Already have an account?`,
        actionName: 'Login',
        href: '/sign-in',
    },
};

export const SignOut: Story = {
    args: {
        message: `Do you want to sign out?`,
        actionName: 'Sign out',
    },
};

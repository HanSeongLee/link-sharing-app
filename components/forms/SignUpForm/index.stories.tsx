import { Meta, StoryObj } from '@storybook/react';
import SignUpForm from './index';

const meta: Meta<typeof SignUpForm> = {
    title: 'Components/Form/SignUpForm',
    component: SignUpForm,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
    args: {
    },
};

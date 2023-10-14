import { Meta, StoryObj } from '@storybook/react';
import EmailVerificationForm from './index';

const meta: Meta<typeof EmailVerificationForm> = {
    title: 'Components/Form/EmailVerificationForm',
    component: EmailVerificationForm,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof EmailVerificationForm>;

export const Default: Story = {
    args: {
    },
};

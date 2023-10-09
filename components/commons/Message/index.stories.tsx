import { Meta, StoryObj } from '@storybook/react';
import Message from './index';
import { ERROR_MESSAGES, INFO_MESSAGES } from 'constants/messages';

const meta: Meta<typeof Message> = {
    title: 'Components/Message',
    component: Message,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Info: Story = {
    args: {
        type: 'info',
        iconName: 'changes-saved',
        content: INFO_MESSAGES.CHANGED_SAVE,
    },
};

export const Error: Story = {
    args: {
        type: 'error',
        content: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
    },
};

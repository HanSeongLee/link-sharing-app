import { Meta, StoryObj } from '@storybook/react';
import EditorHeader from './index';

const meta: Meta<typeof EditorHeader> = {
    title: 'Components/EditorHeader',
    component: EditorHeader,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof EditorHeader>;

export const Default: Story = {
    args: {
        tabItems: [
            {
                key: 'link',
                iconName: 'link',
                label: 'Link',
            },
            {
                key: 'profile-details',
                iconName: 'profile-details-header',
                label: 'Profile Details',
            },
        ],
    },
};

import { Meta, StoryObj } from '@storybook/react';
import ProfileHeader from './index';

const meta: Meta<typeof ProfileHeader> = {
    title: 'Components/ProfileHeader',
    component: ProfileHeader,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof ProfileHeader>;

export const Default: Story = {
    args: {
        link: 'https://google.com',
    },
};

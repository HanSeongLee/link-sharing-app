import { Meta, StoryObj } from '@storybook/react';
import Profile from './index';
import { SocialPlatform } from 'types/social-link';

const meta: Meta<typeof Profile> = {
    title: 'Components/Profile',
    component: Profile,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Profile>;

export const Default: Story = {
    args: {
        avatar: 'https://unsplash.com/photos/d2MSDujJl2g/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjk1ODA5NzUwfA&force=true&w=640',
        firstName: 'Ben',
        lastName: 'Wright',
        email: 'ben@example.com',
        socialLinks: [
            {
                platform: SocialPlatform.Github,
                link: 'https://github.com',
            },
            {
                platform: SocialPlatform.Youtube,
                link: 'https://youtube.com',
            },
            {
                platform: SocialPlatform.Linkedin,
                link: 'https://linkedin.com',
            },
        ],
    },
};

import { Meta, StoryObj } from '@storybook/react';
import SocialButton from './index';
import { SocialPlatform } from 'types/social-link';

const meta: Meta<typeof SocialButton> = {
    title: 'Components/SocialButton',
    component: SocialButton,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof SocialButton>;

export const GitHub: Story = {
    args: {
        platform: SocialPlatform.Github,
        link: 'https://github.com',
    },
};

export const FrontendMentor: Story = {
    args: {
        platform: SocialPlatform.FrontendMentor,
        link: 'https://frontend-mentor.com',
    },
};

export const Twitter: Story = {
    args: {
        platform: SocialPlatform.Twitter,
        link: 'https://twitter.com',
    },
};

export const LinkedIn: Story = {
    args: {
        platform: SocialPlatform.Linkedin,
        link: 'https://linkedin.com',
    },
};

export const YouTube: Story = {
    args: {
        platform: SocialPlatform.Youtube,
        link: 'https://youtube.com',
    },
};

export const Facebook: Story = {
    args: {
        platform: SocialPlatform.Facebook,
        link: 'https://facebook.com',
    },
};

export const Twitch: Story = {
    args: {
        platform: SocialPlatform.Twitch,
        link: 'https://twitch.com',
    },
};

export const DevTo: Story = {
    args: {
        platform: SocialPlatform.Devto,
        link: 'https://dev.to',
    },
};

export const CodeWars: Story = {
    args: {
        platform: SocialPlatform.Codewars,
        link: 'https://codewars.com',
    },
};

export const CodePen: Story = {
    args: {
        platform: SocialPlatform.Codepen,
        link: 'https://codepen.com',
    },
};

export const FreeCodeCamp: Story = {
    args: {
        platform: SocialPlatform.FreeCodeCamp,
        link: 'https://freecodecamp.com',
    },
};

export const GitLab: Story = {
    args: {
        platform: SocialPlatform.Gitlab,
        link: 'https://gitlab.com',
    },
};

export const Hashnode: Story = {
    args: {
        platform: SocialPlatform.Hashnode,
        link: 'https://hashnode.com',
    },
};

export const StackOverflow: Story = {
    args: {
        platform: SocialPlatform.Stackoverflow,
        link: 'https://stackoverflow.com',
    },
};

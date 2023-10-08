import { SocialPlatform } from "types/social-link";

export const SOCIAL_LINKS: {
    [key in SocialPlatform]: {
        name: string;
        color: string;
    };
} = {
    'github': {
        name: 'GitHub',
        color: '#1A1A1A',
    },
    'frontend-mentor': {
        name: 'Frontend Mentor',
        color: '#FFFFFF',
    },
    'twitter': {
        name: 'Twitter',
        color: '#43B7E9',
    },
    'linkedin': {
        name: 'LinkedIn',
        color: '#2D68FF',
    },
    'youtube': {
        name: 'YouTube',
        color: '#EE3939',
    },
    'facebook': {
        name: 'Facebook',
        color: '#2442AC',
    },
    'twitch': {
        name: 'Twitch',
        color: '#EE3FC8',
    },
    'devto': {
        name: 'Dev.to',
        color: '#333333',
    },
    'codewars': {
        name: 'Codewars',
        color: '#8A1A50',
    },
    'codepen': {
        name: 'CodePen',
        color: '#000000',
    },
    'freecodecamp': {
        name: 'freeCodeCamp',
        color: '#302267',
    },
    'gitlab': {
        name: 'GitLab',
        color: '#EB4925',
    },
    'hashnode': {
        name: 'Hashnode',
        color: '#0330D1',
    },
    'stackoverflow': {
        name: 'Stack Overflow',
        color: '#EC7100',
    },
};

import { ISocialLink } from 'types/social-link';

export interface IUserProfile {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    image?: string;
    socialLinks: ISocialLink[];
}

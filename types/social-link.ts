export enum SocialPlatform {
    Github = 'github',
    FrontendMentor = 'frontend-mentor',
    Twitter = 'twitter',
    Linkedin = 'linkedin',
    Youtube = 'youtube',
    Facebook = 'facebook',
    Twitch = 'twitch',
    Devto = 'devto',
    Codewars = 'codewars',
    Codepen = 'codepen',
    FreeCodeCamp = 'freecodecamp',
    Gitlab = 'gitlab',
    Hashnode = 'hashnode',
    Stackoverflow = 'stackoverflow',
}

export interface ISocialLink {
    platform: SocialPlatform;
    link: string;
}

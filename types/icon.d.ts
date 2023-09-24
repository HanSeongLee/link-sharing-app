type IconName =
    'arrow-right' | 'changes-saved' | 'chevron-down' | 'codepen' |
    'codewars' | 'devto' | 'drag-and-drop' | 'email' | 'facebook' |
    'freecodecamp' | 'frontend-mentor' | 'github' | 'gitlab' |
    'hashnode' | 'link' | 'link-copied-to-clipboard' | 'linkedin' |
    'links-header' | 'password' | 'preview-header' | 'profile-details-header' |
    'stackoverflow' | 'twitch' | 'twitter' | 'upload-image' | 'youtube';

interface IIcon {
    name: IconName;
    size?: number;
    color?: 'primary' | 'grey' | 'white' | 'default';
}

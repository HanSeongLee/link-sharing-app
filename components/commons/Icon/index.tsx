import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import ArrowRightIcon from 'public/icons/icon-arrow-right.svg';
import ChangesSavedIcon from 'public/icons/icon-changes-saved.svg';
import ChevronDownIcon from 'public/icons/icon-chevron-down.svg';
import CodepenIcon from 'public/icons/icon-codepen.svg';
import CodewarsIcon from 'public/icons/icon-codewars.svg';
import DevtoIcon from 'public/icons/icon-devto.svg';
import DragAndDropIcon from 'public/icons/icon-drag-and-drop.svg';
import EmailIcon from 'public/icons/icon-email.svg';
import FacebookIcon from 'public/icons/icon-facebook.svg';
import FreecodecampIcon from 'public/icons/icon-freecodecamp.svg';
import FrontendMentorIcon from 'public/icons/icon-frontend-mentor.svg';
import GithubIcon from 'public/icons/icon-github.svg';
import GitlabIcon from 'public/icons/icon-gitlab.svg';
import HashnodeIcon from 'public/icons/icon-hashnode.svg';
import LinkIcon from 'public/icons/icon-link.svg';
import LinkCopiedToClipboardIcon from 'public/icons/icon-link-copied-to-clipboard.svg';
import LinkedinIcon from 'public/icons/icon-linkedin.svg';
import LinksHeaderIcon from 'public/icons/icon-links-header.svg';
import PasswordIcon from 'public/icons/icon-password.svg';
import PreviewHeaderIcon from 'public/icons/icon-preview-header.svg';
import ProfileDetailsHeaderIcon from 'public/icons/icon-profile-details-header.svg';
import StackOverflowIcon from 'public/icons/icon-stack-overflow.svg';
import TwitchIcon from 'public/icons/icon-twitch.svg';
import TwitterIcon from 'public/icons/icon-twitter.svg';
import UploadImageIcon from 'public/icons/icon-upload-image.svg';
import YoutubeIcon from 'public/icons/icon-youtube.svg';

interface IProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>, IIcon {

}

const Icon: React.FC<IProps> = ({
                                    name, size = 16, color='default', className,
                                    ...props
                                }) => {
    return (
        <span className={cn(styles.icon, {
            [styles.primary]: color === 'primary',
            [styles.grey]: color === 'grey',
            [styles.white]: color === 'white',
            [styles.devto]: name === 'devto',
        }, className)}
              style={{
                  '--width': `${size}px`,
                  '--height': `${size}px`,
              } as React.CSSProperties}
              {...props}
        >
            {name === 'arrow-right' && <ArrowRightIcon />}
            {name === 'changes-saved' && <ChangesSavedIcon />}
            {name === 'chevron-down' && <ChevronDownIcon />}
            {name === 'codepen' && <CodepenIcon />}
            {name === 'codewars' && <CodewarsIcon />}
            {name === 'devto' && <DevtoIcon />}
            {name === 'drag-and-drop' && <DragAndDropIcon />}
            {name === 'email' && <EmailIcon />}
            {name === 'facebook' && <FacebookIcon />}
            {name === 'freecodecamp' && <FreecodecampIcon />}
            {name === 'frontend-mentor' && <FrontendMentorIcon />}
            {name === 'github' && <GithubIcon />}
            {name === 'gitlab' && <GitlabIcon />}
            {name === 'hashnode' && <HashnodeIcon />}
            {name === 'link' && <LinkIcon />}
            {name === 'link-copied-to-clipboard' && <LinkCopiedToClipboardIcon />}
            {name === 'linkedin' && <LinkedinIcon />}
            {name === 'links-header' && <LinksHeaderIcon />}
            {name === 'password' && <PasswordIcon />}
            {name === 'preview-header' && <PreviewHeaderIcon />}
            {name === 'profile-details-header' && <ProfileDetailsHeaderIcon />}
            {name === 'stackoverflow' && <StackOverflowIcon />}
            {name === 'twitch' && <TwitchIcon />}
            {name === 'twitter' && <TwitterIcon />}
            {name === 'upload-image' && <UploadImageIcon />}
            {name === 'youtube' && <YoutubeIcon />}
        </span>
    );
};

export default Icon;

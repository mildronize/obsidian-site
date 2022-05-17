import cn from 'classnames';
import { IUserLink } from '@thadaw.com/data';
import Button from './Button';

interface IUserLinksProps {
  userLinks: IUserLink[];
  className?: String;
}

export default function UserLinks({ userLinks, className }: IUserLinksProps) {
  return (
    <>
      {userLinks.map(link => (
        <Button
          className={cn('-mx-1 text-gray-500 dark:text-gray-400 rounded-full px-4', className)}
          target="_blank"
          href={link.url}
          key={link.label}
          aria-label={link.label}
        >
          <i className={link.iconClassName}></i>
        </Button>
      ))}
    </>
  );
}

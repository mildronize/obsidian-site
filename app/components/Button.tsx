import Link from 'next/link';
import cn from 'classnames';

interface IButtonProps {
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
  href: string;
  children: React.ReactNode;
}

export default function Button({ children, href, target, className }: IButtonProps) {
  const _className = cn(
    'p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white font-sans tracking-normal',
    className
  );
  if (target)
    return (
      <a href={href} target={target} className={_className}>
        {children}
      </a>
    );
  return (
    <Link href={href}>
      <a target={target} className={_className}>
        {children}
      </a>
    </Link>
  );
}

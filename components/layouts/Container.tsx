import cn from 'classnames';

export interface IContainerProps {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}

export function Container({ children, wide, className }: IContainerProps) {
  return (
    <div
      className={cn(
        'container mx-auto px-5',
        {
          'max-w-3xl': !wide,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

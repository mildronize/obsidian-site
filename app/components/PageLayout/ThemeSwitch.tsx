// Ref: https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/master/components/ThemeSwitch.js

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        className={`theme-toggle px-4`}
        title="Toggles light & dark"
        onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        {mounted && (
          <div className="relative transition-transform ease-in-out">
            <SunIcon className="absolute opacity-0 z-0 dark:opacity-100 dark:z-10" />
            <MoonIcon className="static opacity-100 z-10 dark:opacity-0 dark:z-0" />
          </div>
        )}
      </button>
    </>
  );
};

export default ThemeSwitch;

interface IIconProps {
  className: string;
}

// Icon from https://feathericons.com, The MIT License (MIT), Copyright (c) 2013-2017 Cole Bemis
const MoonIcon = ({ className }: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={classNames('feather feather-moon', className)}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// Icon from https://feathericons.com, The MIT License (MIT), Copyright (c) 2013-2017 Cole Bemis
const SunIcon = ({ className }: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={classNames('feather feather-sun', className)}
  >
    <circle cx={12} cy={12} r={5} />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

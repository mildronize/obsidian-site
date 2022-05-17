import { Container } from '@thadaw.com/components/layouts';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';

export default function Topbar() {
  return (
    <>
      <section className="fixed top-0 w-full z-10 m-0 overflow-hidden shadow-md dark:shadow-gray-800 py-3 bg-white dark:bg-gray-900 transition-colors duration-200 ease-in">
        <Container wide>
          <div className="flex-row flex items-center justify-between">
            <Logo />
            <div className="flex-row flex items-center">
              <Menu href="/posts">Posts</Menu>
              <Menu href="/talks">Talks</Menu>
              <ThemeSwitch />
            </div>
          </div>
        </Container>
      </section>
      <div className="mb-24 md:mb-32"></div>
    </>
  );
}

function Logo() {
  return (
    <div className="font-bold text-xl text-blue-600 dark:text-blue-500 font-sans">
      <Link href="/">
        <a className="hover:text-blue-500 dark:hover:text-blue-600">Thada W.</a>
      </Link>
    </div>
  );
}

interface IMenuProps {
  href: string;
  children?: React.ReactNode;
}

function Menu({ href, children }: IMenuProps) {
  return (
    <Link href={href}>
      <a className="font-sans hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-md text-md font-medium">
        {children}
      </a>
    </Link>
  );
}

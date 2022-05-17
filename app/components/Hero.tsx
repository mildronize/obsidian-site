import React from 'react';
// import "../themes/font-awesome-all-5.2.0.css";
import Button from './Button';
// import UserLinks from "./UserLinks/UserLinks";
// import config from "../../data/SiteConfig";
import { IHero, IUserLink } from '@thadaw.com/data';

import UserLinks from './UserLinks';

interface IHeroProps extends IHero {
  userLinks: IUserLink[];
}

export default function Hero({ title, tagline, userLinks }: IHeroProps) {
  return (
    <div className="md:pt-10 mb-24">
      <h2 className="text-3xl md:text-4xl font-heading leading-10 sm:leading-11 tracking-tight md:tracking-normal text-gray-700 dark:text-gray-200">
        {title}
        <span className="text-slate-400">
          {` `}
          {tagline}
        </span>
      </h2>
      <div className="mt-10">
        <Button className="font-bold mr-3 text-gray-600 dark:text-gray-400" href="/about">
          👤&nbsp; About Me
        </Button>
        <Button
          className="font-bold text-gray-600 dark:text-gray-400"
          href="https://bit.ly/mildthada-notion-cv-v3"
          target="_blank"
        >
          📄&nbsp; Resume
        </Button>
        <div className="mt-8">
          <div className="mb-2 text-gray-700 dark:text-gray-400">Getting to know me: </div>
          <UserLinks userLinks={userLinks} className="text-xl" />
        </div>
      </div>
    </div>
  );
}

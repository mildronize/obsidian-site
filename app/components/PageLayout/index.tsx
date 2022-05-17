import React from 'react';
import Footer from './Footer';
import Meta, { IMetaProps } from './Meta';
import Topbar from './Topbar';

interface ILayoutProps extends IMetaProps {
  children?: React.ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <>
      <Meta {...props} />
      <Topbar />
      <div className="min-h-screen">
        <main>{props.children}</main>
      </div>
      <Footer />
    </>
  );
}

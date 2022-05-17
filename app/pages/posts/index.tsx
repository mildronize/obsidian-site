import { Container } from '@thadaw.com/components/layouts';
import PostListByYear from '@thadaw.com/components/PostListByYear';
import PageLayout from '@thadaw.com/components/PageLayout';
import { queryContent } from '@thadaw.com/libs/content-service';

import { siteMetadata } from '@thadaw.com/data';
const { hero } = siteMetadata.components;

interface IIndexProps {
  allPosts: any[];
}

export default function Index({ allPosts }: IIndexProps) {
  return (
    <>
      <PageLayout>
        <Container>
          <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter md:tracking-normal leading-tight font-heading">
            All Posts
          </h2>
          <PostListByYear posts={allPosts} />
        </Container>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = await queryContent(['title', 'date', 'slug'], {
    orderBy: { date: 'DESC' },
  });

  return {
    props: { allPosts },
  };
}

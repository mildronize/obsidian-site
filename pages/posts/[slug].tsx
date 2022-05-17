import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Container } from '@thadaw.com/components/layouts';
import PostBody from '@thadaw.com/components/Post/PostBody';
import PostHeader from '@thadaw.com/components/Post/PostHeader';
import PageLayout from '@thadaw.com/components/PageLayout';
import { getContentBySlug, getAllContentOnlySlug } from '@thadaw.com/libs/content-service';
import MarkdownParser from '@thadaw.com/libs/markdown-parser';

interface IPostProps {
  post: any;
}

export default function Post({ post }: IPostProps) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PageLayout pageTitle={post.title} postNode={post} postSEO>
      <Container>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article className="mb-32">
              <PostHeader
                title={post.title}
                // coverImage={post.coverImage}
                date={post.date}
                // author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params }: any) {
  const post = await getContentBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'path',
    'content',
    // For Page Meta
    'description', 
    'excerpt',
    'cover',
    'shortURL',
    'unsplashImgCoverId',
  ]);
  const markdownParserOption = {
    relativePath: post.path,
  };

  const content = await new MarkdownParser(post.content || '', markdownParserOption).toHtml();

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllContentOnlySlug();

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

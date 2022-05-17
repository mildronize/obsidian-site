import { IPostSerializableJSON } from '@thadaw.com/libs/content-service';
import PostPreview from './Post/PostPreview';

interface IMoreStoriesProps {
  posts: IPostSerializableJSON[];
}

export default function PostList({ posts }: IMoreStoriesProps) {
  return (
    <section>
      <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter md:tracking-normal leading-tight font-heading">
        Recent Posts
      </h2>
      <div className="">
        {posts.map(post => (
          <PostPreview key={post.slug} title={post.title || ''} date={post.date || ''} slug={post.slug || ''} />
        ))}
      </div>
    </section>
  );
}

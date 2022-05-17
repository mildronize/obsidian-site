import Link from 'next/link';
import { parseISO, format, isValid } from 'date-fns';
import DateFormatter from './DateFormatter';
import { IPostSerializableJSON } from '@thadaw.com/libs/content-service';
import { postPath } from '@thadaw.com/libs/utility';

type PostListByYear = Pick<IPostSerializableJSON, 'slug' | 'title' | 'date'>;

interface IPostListByYearProps {
  posts: PostListByYear[];
}

export default function PostListByYear({ posts }: IPostListByYearProps) {
  return (
    <section>
      {getYearGroup(posts).map(year => (
        <div key={year}>
          <h2 className="my-8 text-xl md:text-2xl font-bold tracking-tighter md:tracking-normal leading-tight font-heading">
            {year}
          </h2>
          <PostList posts={posts} year={year} />
        </div>
      ))}
    </section>
  );
}

interface IPostListProps extends IPostListByYearProps {
  year: number;
}

function PostList({ posts, year }: IPostListProps) {
  const parseYear = (post: PostListByYear) =>
    post.date && isValid(new Date(post.date)) ? parseInt(format(parseISO(post.date), 'yyyy')) : 0;
  return (
    <section>
      <div className="">
        {posts.map(
          post =>
            parseYear(post) === year && (
              <PostItem key={post.slug} title={post.title || ''} date={post.date || ''} slug={post.slug || ''} />
            )
        )}
      </div>
    </section>
  );
}

function PostItem({ title, date, slug }: PostListByYear) {
  return (
    <>
      <div className="flex-row flex  justify-between flex-nowrap">
        <h3 className="text-md mb-10 sm:mb-3 pr-8 leading-snug  tracking-tighter md:tracking-normal md:truncate hover:truncate-none hover:scale-102 transition-transform font-sans font-normal">
          <Link href={postPath(slug || '')}>
            <a className="dark:hover:text-blue-300 hover:text-blue-800">{title}</a>
          </Link>
        </h3>
        <div className="text-sm mb-4 min-w-fit text-gray-500 dark:text-gray-400 font-bold">
          {date && <DateFormatter dateString={date} format="MM-dd" />}
        </div>
      </div>
    </>
  );
}

function getYearGroup(posts: PostListByYear[]) {
  const yearSet = new Set<number>();
  posts.forEach(post => {
    if (post.date) {
      yearSet.add(parseInt(format(parseISO(post.date), 'yyyy')));
    }
  });
  return Array.from(yearSet).sort((a, b) => b - a);
}

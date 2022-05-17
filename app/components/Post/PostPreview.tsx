import DateFormatter from '../DateFormatter';
import Link from 'next/link';
import { postPath } from '@thadaw.com/libs/utility';

interface IPostPreviewProps {
  title: string;
  date: string;
  slug: string;
}

export default function PostPreview({ title, date, slug }: IPostPreviewProps) {
  return (
    <div>
      <div className="mb-10"></div>
      <h3 className="text-xl mb-3 leading-snug  tracking-tighter md:tracking-normal">
        <Link href={postPath(slug)}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-sm mb-4">
        <DateFormatter dateString={date} />
      </div>
    </div>
  );
}

import DateFormatter from '../DateFormatter';
import Link from 'next/link';
import { postPath } from '@thadaw.com/libs/utility';

interface IHeroPostProps {
  title: string;
  date: string;
  slug: string;
}

export default function HeroPost({ title, date, slug }: IHeroPostProps) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
          <div>
            <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
              <Link href={postPath(slug)}>
                <a className="hover:underline">{title}</a>
              </Link>
            </h3>
            <div className="mb-4 md:mb-0 text-lg">
              <DateFormatter dateString={date} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

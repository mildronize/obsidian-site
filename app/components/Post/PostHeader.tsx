import DateFormatter from '../DateFormatter';

interface IPostHeaderProps {
  title: string;
  date: string;
}

export default function PostHeader({ title, date }: IPostHeaderProps) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">{/* <Avatar name={author.name} picture={author.picture} /> */}</div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        {/* <CoverImage title={title} src={coverImage} height={620} width={1240} /> */}
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">{/* <Avatar name={author.name} picture={author.picture} /> */}</div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}

function PostTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl lg:text-5xl leading-tight lg:leading-14 mb-12  font-bold tracking-tighter md:tracking-tight text-left">
      {children}
    </h1>
  );
}

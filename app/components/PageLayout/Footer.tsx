import { Container } from '@thadaw.com/components/layouts';
import UserLinks from '@thadaw.com/components/UserLinks';
import { siteMetadata } from '@thadaw.com/data';
import { format } from 'date-fns';

const { footer } = siteMetadata.components;
export default function Footer() {
  return (
    <footer className="text-center mt-40 mb-14 font-sans text-sm">
      <Container>
        <div>
          © {footer.sinceYear} - {format(new Date(), 'yyyy')} {footer.copyright}
        </div>
        <div dangerouslySetInnerHTML={{ __html: footer.tagline }} />
        <div className="mt-3">
          <UserLinks userLinks={siteMetadata.userLinks} className="-mx-2"></UserLinks>
        </div>
      </Container>
    </footer>
  );
}

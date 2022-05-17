import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// Solved by https://github.com/testing-library/jest-dom/issues/45#issuecomment-593561878
import '@testing-library/jest-dom/extend-expect';
import Index from '@thadaw.com/pages/index';
import { queryContent } from '@thadaw.com/libs/content-service';

describe('Home', () => {
  it('renders a heading', async () => {
    const allPosts = await queryContent(['title', 'date', 'slug']);

    render(<Index allPosts={allPosts} />);

    const heading = screen.getByRole('heading', {
      name: /Recent Posts/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

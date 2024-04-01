import { render } from '@testing-library/react';

import BlogUiPack from './blog-ui-pack';

describe('BlogUiPack', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogUiPack />);
    expect(baseElement).toBeTruthy();
  });
});

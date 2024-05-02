import { render } from '@testing-library/react';

import GlobalUiPack from './global-ui-pack';

describe('GlobalUiPack', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GlobalUiPack />);
    expect(baseElement).toBeTruthy();
  });
});

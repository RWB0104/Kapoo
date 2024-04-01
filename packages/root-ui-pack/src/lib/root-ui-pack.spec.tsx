import { render } from '@testing-library/react';

import RootUiPack from './root-ui-pack';

describe('RootUiPack', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RootUiPack />);
    expect(baseElement).toBeTruthy();
  });
});

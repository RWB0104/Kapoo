import { render } from '@testing-library/react';

import PieditUiPack from './piedit-ui-pack';

describe('PieditUiPack', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PieditUiPack />);
    expect(baseElement).toBeTruthy();
  });
});

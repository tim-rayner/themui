import { render } from '@testing-library/react';

import WebMarketing from './web-marketing';

describe('WebMarketing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebMarketing />);
    expect(baseElement).toBeTruthy();
  });
});

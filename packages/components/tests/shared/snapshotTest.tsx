import type React from 'react';
import { expect } from 'vitest';
import { render } from '@testing-library/react';

export default function snapshotTest(node: React.ReactElement) {
  const { container } = render(node);
  expect(container.firstChild).toMatchSnapshot();
}

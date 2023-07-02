import type React from 'react';
import { it, expect } from 'vitest';
import { render } from '@testing-library/react';

export default function mountTest(node: React.ReactElement) {
  it('组件可以 mount 和 unmount 而不会出错', () => {
    const { unmount, rerender } = render(node);
    expect(() => {
      rerender(node);
      unmount();
    }).not.toThrow();
  });
}

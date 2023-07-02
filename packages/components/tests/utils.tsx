import { act } from '@testing-library/react';

export const sleep = async (timeout = 0) => {
  await act(async () => new Promise((resolve) => setTimeout(resolve, timeout)));
};

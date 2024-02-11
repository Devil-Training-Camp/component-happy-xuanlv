import React from 'react';
import { describe, it } from 'vitest';
import HappySpace from '../HappySpace';
import mountTest from '../../../tests/shared/mountTest';
import snapshotTest from '../../../tests/shared/snapshotTest';

describe('HappySpace', () => {
  mountTest(<HappySpace />);

  it('正常渲染', async () => {
    snapshotTest(<HappySpace size="small" />);
    snapshotTest(<HappySpace size="middle" />);
    snapshotTest(<HappySpace size="large" />);
    snapshotTest(<HappySpace size={8} />);
    snapshotTest(<HappySpace size={[8, 12]} />);
    snapshotTest(<HappySpace direction="vertical" />);
  });
});

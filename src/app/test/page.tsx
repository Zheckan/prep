'use client';
import { Test } from '../../components';

export default function TestPage() {
  return (
    <Test
      onStake={() => {
        return new Promise((resolve) => setTimeout(resolve, 1000));
      }}
      tokenBalance={110}
    />
  );
}

import { useState } from 'react';
import { useFunction } from '@xuan/hooks';

interface UseControllableValueParams<V, C> {
  controlled: boolean;
  defaultValue: V;
  value?: V;
  onChange?: (p: C, ...args: unknown[]) => void;
  getValue?: (p: C, ...args: unknown[]) => V;
}

export default function useControllableValue<V, C>({
  controlled,
  defaultValue,
  value: controlledValue,
  onChange: onControlledChange,
  getValue,
}: UseControllableValueParams<V, C>) {
  const [innerValue, onInnerValueChange] = useState(defaultValue);
  // 是否显示
  const value = controlled ? controlledValue : innerValue;

  const onChange = useFunction((nextValue: C, ...args: unknown[]) => {
    if (!controlled) {
      onInnerValueChange(getValue ? getValue(nextValue, ...args) : (nextValue as unknown as V));
    }
    onControlledChange?.(nextValue, ...args);
  });

  return [value as V, onChange] as const;
}

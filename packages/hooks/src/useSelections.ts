import { useMemo, useState } from 'react';
import { useMethods } from './useMethods';

export function useSelections<T>(items: T[], defaultSelected: T[] = []) {
  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const noneSelected = useMemo(() => items.every((o) => !selectedSet.has(o)), [items, selectedSet]);
  const allSelected = useMemo(
    () => items.every((o) => selectedSet.has(o)) && !noneSelected,
    [items, selectedSet, noneSelected],
  );

  const partiallySelected = useMemo(
    () => !noneSelected && !allSelected,
    [noneSelected, allSelected],
  );

  const fn = useMethods({
    isSelected: (item: T) => selectedSet.has(item),
    select: (item: T) => {
      selectedSet.add(item);
      return setSelected(Array.from(selectedSet));
    },
    unSelect: (item: T) => {
      selectedSet.delete(item);
      return setSelected(Array.from(selectedSet));
    },
    toggle: (item: T) => {
      if (fn.isSelected(item)) {
        fn.unSelect(item);
      } else {
        fn.select(item);
      }
    },
    selectAll: () => {
      items.forEach((o) => {
        selectedSet.add(o);
      });
      setSelected(Array.from(selectedSet));
    },
    unSelectAll: () => {
      items.forEach((o) => {
        selectedSet.delete(o);
      });
      setSelected(Array.from(selectedSet));
    },
    toggleAll: () => (allSelected ? fn.unSelectAll() : fn.selectAll()),
  });

  return {
    selected,
    noneSelected,
    allSelected,
    partiallySelected,
    setSelected,
    ...fn,
  } as const;
}

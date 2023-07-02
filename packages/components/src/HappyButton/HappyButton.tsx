import React from 'react';
import clsx from 'clsx';
import { HappySpin } from '../HappySpin';
import type { HappyButtonProps } from './types';
import styles from './HappyButton.module.less';

/**
 * HappyButton
 */
function HappyButton<E extends keyof JSX.IntrinsicElements>(
  {
    block,
    className,
    disabled,
    bordered,
    active,
    icon,
    loading,
    shape,
    size = 'middle',
    type,
    outline,
    danger,
    onClick,
    buttonTagName = 'button',
    children,
    ...restProps
  }: HappyButtonProps<E>,
  ref: React.ForwardedRef<HTMLElement>,
) {
  // 标签节点
  const ButtonElement = buttonTagName as unknown as React.HTMLFactory<HTMLElement>;

  function renderIcon() {
    if (loading) {
      return <HappySpin className={styles.icon} style={{ color: 'currentColor' }} size="small" />;
    }
    if (!children) {
      return icon;
    }
    if (icon) {
      return <span className={styles.icon}>{icon}</span>;
    }
    return undefined;
  }

  return (
    <ButtonElement
      className={clsx(styles.happyButton, className, {
        [styles.block]: block,
        [styles.outline]: outline,
        [styles.circle]: shape === 'circle',
        [styles.round]: shape === 'round',
        [styles.primary]: type === 'primary',
        [styles.dashed]: type === 'dashed',
        [styles.large]: size === 'large',
        [styles.small]: size === 'small',
        [styles.onlyIcon]: !children,
        [styles.loading]: loading,
        [styles.disabled]: disabled,
        [styles.borderless]: bordered === false,
        'happy-button-active': active,
        [styles.danger]: danger,
      })}
      ref={ref}
      disabled={disabled}
      type="button"
      onClick={loading ? undefined : onClick}
      {...restProps}
    >
      {renderIcon()}
      {children}
    </ButtonElement>
  );
}

export default React.forwardRef(HappyButton);

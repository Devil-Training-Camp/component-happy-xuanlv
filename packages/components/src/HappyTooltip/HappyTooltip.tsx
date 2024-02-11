import React from 'react';
import { HappyTrigger } from '../HappyTrigger';
import type { HappyTooltipProps } from './types';
import { isNil } from '../utils';
import { TooltipContent } from './TooltipContent';

function HappyTooltip(
  {
    theme = 'dark',
    showArrow,
    content,
    children,
    overlayMode = 'message',
    overlayClassName,
    overlayStyle,
    matchTriggerWidth,
    ...restProps
  }: HappyTooltipProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  return (
    <HappyTrigger
      ref={ref}
      {...restProps}
      popup={(popupConfig) => {
        const contentNode = typeof content === 'function' ? content(popupConfig) : content;
        // 无内容则不显示
        if (isNil(contentNode)) {
          return null;
        }
        return (
          <TooltipContent
            className={overlayClassName}
            content={contentNode}
            theme={theme}
            {...popupConfig}
            showArrow={showArrow}
            overlayMode={overlayMode}
            matchTriggerWidth={matchTriggerWidth}
            style={overlayStyle}
          />
        );
      }}
    >
      {children}
    </HappyTrigger>
  );
}

export default React.forwardRef(HappyTooltip);

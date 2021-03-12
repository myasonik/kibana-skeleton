import {
  CommonProps,
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui';
import classNames from 'classnames';
import React, { HTMLAttributes, ReactElement } from 'react';

type Props = CommonProps & HTMLAttributes<HTMLDivElement>;

export function EuiSuperDatePicker({
  className,
  ...rest
}: Props): ReactElement {
  const classes = classNames('euiSuperDatePicker_shim', className);

  return (
    <EuiFlexGroup
      gutterSize="s"
      responsive={false}
      className={classes}
      {...rest}>
      <EuiFlexItem grow={false}>
        <EuiButton size="s" iconType="calendar">
          Last 15 min
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display="base"
          size="s"
          iconType="refresh"
          aria-label="Refresh"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

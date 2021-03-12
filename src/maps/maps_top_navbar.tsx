import {
  CommonProps,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import classNames from "classnames";
import { HTMLAttributes, ReactElement } from "react";
import { EuiSuperDatePicker } from "../components/eui/super_date_picker";
import { MapsIconClockPlay } from "./icons/";

type MapsTopNavbarProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    onToggleTimeslider: () => void;
  };

export function MapsTopNavbar({
  className,
  onToggleTimeslider,
  ...rest
}: MapsTopNavbarProps): ReactElement {
  const classes = classNames("kbnGlobals", className);

  return (
    <EuiFlexGroup
      gutterSize="s"
      responsive={false}
      className={classes}
      {...rest}
    >
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display="base"
          size="s"
          iconType="filter"
          aria-label="Filter"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={true}>
        <EuiFieldText
          placeholder="Filter with KQL..."
          compressed
          fullWidth
          append={
            <EuiButtonEmpty size="xs" iconType="plusInCircle">
              Add
            </EuiButtonEmpty>
          }
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiSuperDatePicker />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display="base"
          size="s"
          iconType={MapsIconClockPlay}
          aria-label="More"
          onClick={onToggleTimeslider}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

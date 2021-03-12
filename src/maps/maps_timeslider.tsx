import { HTMLAttributes, ReactElement } from "react";
import { CommonProps } from "@elastic/eui";
import classNames from "classnames";
import { EuiIcon, EuiBadge, EuiPanel, EuiButtonIcon } from "@elastic/eui";
import { MapsIconNext, MapsIconPrevious } from "./icons/";

type MapsTimesliderProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    onClose: () => void;
  };

export function MapsTimeslider({
  className,
  onClose,
}: MapsTimesliderProps): ReactElement {
  const classes = classNames("kbnMapsTimeslider", className);

  return (
    <EuiPanel paddingSize="l" className={classes}>
      <div className="kbnMapsTimeslider__row">
        <EuiButtonIcon
          onClick={onClose}
          iconType="cross"
          color="subdued"
          className="kbnMapsTimeslider__close"
        ></EuiButtonIcon>

        <div className="kbnMapsTimeslider__timeWindow">
          <span>
            <EuiIcon type="dot" color="primary"></EuiIcon>
            <span>Mar 1 - Mar 15</span>
          </span>
          <EuiBadge
            color="primary"
            onClick={() => {}}
            onClickAriaLabel="Aria label applied to text button"
          >
            History
          </EuiBadge>
        </div>
        <div className="kbnMapsTimeslider__controls">
          <EuiButtonIcon
            onClick={onClose}
            iconType={MapsIconPrevious}
            color="text"
          ></EuiButtonIcon>
          <EuiButtonIcon
            onClick={onClose}
            iconType={MapsIconNext}
            color="text"
          ></EuiButtonIcon>
        </div>
      </div>
      <div className="kbnMapsTimeslider__row">slider</div>
    </EuiPanel>
  );
}

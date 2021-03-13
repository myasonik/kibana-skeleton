import { HTMLAttributes, ReactElement } from "react";
import { CommonProps } from "@elastic/eui";
import classNames from "classnames";
import {
  EuiIcon,
  EuiBadge,
  EuiPanel,
  EuiButtonIcon,
  EuiDualRange,
  EuiDualRangeProps,
} from "@elastic/eui";
import { MapsIconNext, MapsIconPrevious } from "./icons/";
import { useState } from "react";

type MapsTimesliderProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    onClose: () => void;
  };

export function MapsTimeslider({
  className,
  onClose,
}: MapsTimesliderProps): ReactElement {
  const classes = classNames("kbnMapsTimeslider", className);
  const last90Days: EuiDualRangeProps["value"][] = [
    [0, 15],
    [16, 31],
    [32, 47],
    [48, 63],
    [64, 79],
    [80, 95],
  ];
  const [timeWindow, setTimeWindow] = useState(last90Days[0]);

  const onChangeTimeWindow: EuiDualRangeProps["onChange"] = (value) => {
    setTimeWindow(value);
  };

  const onClickNext = () => {
    const isElement = (element: EuiDualRangeProps["value"]) =>
      element[0] === timeWindow[0];

    const position = last90Days.findIndex(isElement);

    if (position >= last90Days.length - 1) {
      setTimeWindow(last90Days[0]);
    } else {
      setTimeWindow(last90Days[position + 1]);
    }
  };
  const onClickPrevious = () => {};

  return (
    <EuiPanel paddingSize="l" className={classes}>
      <div className="kbnMapsTimeslider__row">
        <EuiButtonIcon
          onClick={onClose}
          iconType="cross"
          color="subdued"
          className="kbnMapsTimeslider__close"
          aria-label="Close timeslider"
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
            onClick={onClickPrevious}
            iconType={MapsIconPrevious}
            color="text"
            aria-label="Previous time window"
          ></EuiButtonIcon>
          <EuiButtonIcon
            onClick={onClickNext}
            iconType={MapsIconNext}
            color="text"
            aria-label="Next time window"
          ></EuiButtonIcon>
        </div>
      </div>
      <div className="kbnMapsTimeslider__row">
        <EuiDualRange value={timeWindow} onChange={onChangeTimeWindow} />
      </div>
    </EuiPanel>
  );
}

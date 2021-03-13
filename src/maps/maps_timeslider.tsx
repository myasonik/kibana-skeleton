import { HTMLAttributes, ReactElement } from "react";
import { CommonProps } from "@elastic/eui";
import classNames from "classnames";
import {
  EuiIcon,
  EuiBadge,
  EuiPanel,
  EuiButtonIcon,
  // EuiDualRange,
  // EuiDualRangeProps,
} from "@elastic/eui";
import { MapsIconNext, MapsIconPrevious } from "./icons/";
import { useState } from "react";
import { EuiDualRange } from "../components/eui";
import { EuiDualRangeProps } from "../components/eui/range/dual_range";

type MapsTimesliderProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    onClose: () => void;
  };

export function MapsTimeslider({
  className,
  onClose,
}: MapsTimesliderProps): ReactElement {
  const classes = classNames("kbnMapsTimeslider", className);
  const last90DaysText: String[] = [
    "Feb 28 - Mar 7",
    "Mar 7 - Mar 14",
    "Mar 14 - Mar 21",
    "Mar 21 - Mar 28",
    "Mar 28 - April 4",
    "April 4 - April 11",
  ];
  const last90Days: EuiDualRangeProps["value"][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
  ];
  const ticks = [
    { label: "Feb 28", value: 0 },
    { label: "Mar 7", value: 1 },
    { label: "Mar 14", value: 2 },
    { label: "Mar 21", value: 3 },
    { label: "Mar 28", value: 4 },
    { label: "April 4", value: 5 },
    { label: "April 11", value: 6 },
  ];
  const [timeWindow, setTimeWindow] = useState(last90Days[0]);
  const [timeWindowText, setTimeWindowText] = useState(last90DaysText[0]);

  const onChangeTimeWindow: EuiDualRangeProps["onChange"] = (value) => {
    setTimeWindow(value);
  };

  const onClickNext = () => {
    const isElement = (element: EuiDualRangeProps["value"]) =>
      element[0] === timeWindow[0];

    const position = last90Days.findIndex(isElement);

    if (position >= last90Days.length - 1) {
      setTimeWindow(last90Days[0]);
      setTimeWindowText(last90DaysText[0]);
    } else {
      setTimeWindow(last90Days[position + 1]);
      setTimeWindowText(last90DaysText[position + 1]);
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
            <span>{timeWindowText}</span>
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
        <EuiDualRange
          fullWidth={true}
          value={timeWindow}
          onChange={onChangeTimeWindow}
          showTicks={true}
          min={0}
          max={6}
          step={1}
          ticks={ticks}
        />
      </div>
    </EuiPanel>
  );
}

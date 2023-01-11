import { FC } from "react";
import { ReactComponent as SpinnerSvg } from "./spinner.svg";

export const SpinnerSection: FC = () => {
  return (
    <div className="spinner-section">
      <SpinnerSvg />
    </div>
  );
};

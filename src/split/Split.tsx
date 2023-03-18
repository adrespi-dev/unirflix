import { FC } from "react";
import { Predictions } from "./Predictions";
import { User } from "./User";

export const Split: FC = () => {
  return (
    <div className="split">
      <div className="split-left">
        <User />
      </div>
      <div className="split-right">
        <Predictions />
      </div>
    </div>
  );
};

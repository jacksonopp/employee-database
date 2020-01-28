import React from "react";
import "./FilterButton.css";

interface Props {
   title: String;
   cb: any;
}

const FilterButton: React.FC<Props> = ({ title, cb }: Props) => {
   return (
      <button
         onClick={() => {
            cb();
         }}
      >
         {title}
      </button>
   );
};

export default FilterButton;

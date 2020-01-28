import React, { useState, useEffect } from "react";
import { Employee } from "./Table";

interface Props {
   data: Employee[];
   handleData: any;
}

const Search: React.FC<Props> = ({ data, handleData }: Props) => {
   const [search, setSearch] = useState("");

   useEffect(() => {
      const newData: Employee[] = data.filter(d =>
         d.name.first.toLowerCase().includes(search)
      );
      handleData(newData);
   }, [search]);
   return (
      <>
         <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
         />
         <p>{search}</p>
      </>
   );
};

export default Search;

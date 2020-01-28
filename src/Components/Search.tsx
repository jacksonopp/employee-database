import React, { useState, useEffect } from "react";
import { Employee } from "./Table";
import "./Search.css";

interface Props {
   data: Employee[];
   handleData: any;
}

const Search: React.FC<Props> = ({ data, handleData }: Props) => {
   const [search, setSearch] = useState("");

   useEffect(() => {
      const newData: Employee[] = data.filter(
         d =>
            d.name.first.toLowerCase().includes(search) ||
            d.name.last.toLowerCase().includes(search)
      );
      handleData([...newData]);
   }, [search]);
   return (
      <>
         <input
            placeholder="search name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            name="name search"
            aria-label="name-search"
         />
      </>
   );
};

export default Search;

import React, { useState, useEffect } from "react";
import { Employee } from "./Table";
import "./Search.css";

interface Props {
   data: Employee[];
   handleData: any;
}

const Search: React.FC<Props> = ({ data, handleData }: Props) => {
   const [search, setSearch] = useState("");
   const [type, setType] = useState("name");

   useEffect(() => {
      switch (type) {
         case "name":
            handleData([
               ...data.filter(
                  d =>
                     d.name.first
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                     d.name.last.toLowerCase().includes(search.toLowerCase())
               )
            ]);
            break;
         case "location":
            handleData([
               ...data.filter(
                  d =>
                     d.location.city
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                     d.location.country
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                     d.location.state
                        .toLowerCase()
                        .includes(search.toLowerCase())
               )
            ]);
      }
   }, [search]);
   return (
      <>
         <input
            placeholder={`search ${type}`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            name="name search"
            aria-label="name-search"
         />
         <button
            className={type === "name" ? "active" : ""}
            onClick={() => setType("name")}
         >
            Name
         </button>
         <button
            className={type === "location" ? "active" : ""}
            onClick={() => setType("location")}
         >
            location
         </button>
      </>
   );
};

export default Search;

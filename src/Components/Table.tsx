import React, { useState, useEffect } from "react";

import { useGet } from "../hooks/API";

import Search from "./Search";
import FilterButton from "./FilterButton";

import "./Table.css";

export interface Employee {
   name: {
      first: string;
      last: string;
   };
   email: string;
   dob: {
      date: string;
      age: number;
   };
   login: {
      uuid: string;
   };
   location: {
      city: string;
      country: string;
      state: string;
   };
   picture: {
      large: string;
      medium: string;
      thumbnail: string;
   };
}

const Table: React.FC = () => {
   const [viewEmployees, setViewEmployees] = useState([]);
   const [isAsc, setIsAsc] = useState();
   const { data: employees } = useGet(
      "https://randomuser.me/api/?results=200&nat=us,au,dk,fr,gb"
   );

   console.log(employees);

   useEffect(() => {
      setViewEmployees(employees);
   }, [employees]);

   function handleEmployeeData(newData: any) {
      setViewEmployees(newData);
   }

   type SearchParam = string | number;

   function sortAsc(paramOne: SearchParam, paramTwo?: SearchParam) {
      if (paramTwo === undefined) {
         const newData = viewEmployees.sort((a, b) =>
            a[paramOne] < b[paramOne] ? -1 : 1
         );
         handleEmployeeData([...newData]);
      } else {
         const newData = viewEmployees.sort((a, b) =>
            a[paramOne][paramTwo] < b[paramOne][paramTwo] ? -1 : 1
         );
         handleEmployeeData([...newData]);
      }
   }
   function sortDesc(paramOne: SearchParam, paramTwo?: SearchParam) {
      if (paramTwo === undefined) {
         const newData = viewEmployees.sort((a, b) =>
            a[paramOne] < b[paramOne] ? 1 : -1
         );
         handleEmployeeData([...newData]);
      } else {
         const newData = viewEmployees.sort((a, b) =>
            a[paramOne][paramTwo] < b[paramOne][paramTwo] ? 1 : -1
         );
         handleEmployeeData([...newData]);
      }
   }

   function sort(paramOne: SearchParam, paramTwo?: SearchParam) {
      if (!isAsc) {
         sortAsc(paramOne, paramTwo);
         setIsAsc(true);
         return;
      }
      if (isAsc) {
         sortDesc(paramOne, paramTwo);
         setIsAsc(false);
         return;
      }
   }
   return (
      <>
         <Search data={employees} handleData={handleEmployeeData} />
         <table className="table">
            <thead>
               <tr>
                  <th>
                     <FilterButton
                        cb={() => sort("name", "first")}
                        title="First Name"
                     />
                  </th>
                  <th>
                     <FilterButton
                        cb={() => sort("name", "last")}
                        title="Last Name"
                     />
                  </th>
                  <th>
                     <FilterButton cb={() => sort("dob", "age")} title="Age" />
                  </th>
                  <th>
                     <FilterButton cb={() => sort("email")} title="Email" />
                  </th>
                  <th>
                     <FilterButton
                        cb={() => sort("location", "city")}
                        title="City"
                     />
                  </th>
                  <th>
                     <FilterButton
                        cb={() => sort("location", "state")}
                        title="State/County"
                     />
                  </th>
                  <th>
                     <FilterButton
                        cb={() => sort("location", "country")}
                        title="Country"
                     />
                  </th>
               </tr>
            </thead>
            <tbody>
               {viewEmployees.map((employee: Employee) => {
                  return (
                     <tr key={employee.login.uuid}>
                        <td>{employee.name.first}</td>
                        <td>{employee.name.last}</td>
                        <td>{employee.dob.age}</td>
                        <td>{employee.email}</td>
                        <td>{employee.location.city}</td>
                        <td>{employee.location.state}</td>
                        <td>{employee.location.country}</td>
                        <td>
                           <img
                              src={employee.picture.medium}
                              alt={`${employee.name.first} ${employee.name.last}`}
                           />
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </>
   );
};

export default Table;

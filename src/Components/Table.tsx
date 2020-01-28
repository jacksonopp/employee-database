import React, { useState, useEffect } from "react";

import { useGet } from "../hooks/API";

import Search from "./Search";

export interface Employee {
   name: {
      title: string;
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
}

const Table: React.FC = () => {
   const [viewEmployees, setViewEmployees] = useState([]);
   const { data: employees } = useGet(
      "https://randomuser.me/api/?results=20&nat=us,au,dk,fr,gb"
   );

   useEffect(() => {
      setViewEmployees(employees);
   }, [employees]);

   function handleEmployeeData(newData: any) {
      setViewEmployees(newData);
   }

   return (
      <>
         <Search data={employees} handleData={handleEmployeeData} />
         <table>
            <thead>
               <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Email</th>
               </tr>
            </thead>
            <tbody>
               {viewEmployees.map((employee: Employee) => (
                  <tr key={employee.login.uuid}>
                     <td>{employee.name.first}</td>
                     <td>{employee.name.last}</td>
                     <td>{employee.dob.age}</td>
                     <td>{employee.email}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default Table;

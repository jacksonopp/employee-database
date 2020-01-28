import React from "react";
import "./App.css";

import Table from "./Components/Table";
const App: React.FC = () => {
   return (
      <div className="App">
         <h1>Employee Database</h1>
         <Table />
      </div>
   );
};

export default App;

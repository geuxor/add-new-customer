import React from "react";
import AppRouter from "./router/AppRouter";

const App = () => {
  console.log(React.version);
  return (
    <div className="">
      <AppRouter />
    </div>
  );
};

export default App;

import React from "react";
import AppRouter from "./router/AppRouter";

const App = () => {
  console.log("React version", React.version);
  window.addEventListener('keydown', function (e) {
    if (e.code === 'Enter' || e.keyIdentifier === 'U+000A' || e.keyIdentifier === 'Enter' || e.key === 13) {
      if (e.target.nodeName === 'INPUT' && e.target.type === 'text') {
        e.preventDefault(); return false;
      }
    }
  }, true);

  return (
    <div className="">
      <AppRouter />
    </div>
  );
};

export default App;

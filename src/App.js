import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoute } from "~/route";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {publicRoute.map((route, index) => {
              const path = route.path;
              const Component = route.component;
              return <Route key={index} path={path} element={<Component />} />;
            })}
          </Routes>
        </div>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;

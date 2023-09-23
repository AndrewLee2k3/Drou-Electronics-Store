import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
function App() {
  return (
    <Routes>
      <Route path="" element={<DefaultLayout />}></Route>
      <Route />
    </Routes>
  );
}

export default App;

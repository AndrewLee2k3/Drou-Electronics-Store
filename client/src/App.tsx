import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { UserHome } from './pages';
function App() {
  return (
    <Routes>
      <Route path="" element={<DefaultLayout />}>
        <Route index element={<UserHome />} />
      </Route>
      <Route />
    </Routes>
  );
}

export default App;

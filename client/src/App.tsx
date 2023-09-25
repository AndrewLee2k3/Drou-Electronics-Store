import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { UserHome, Page404 } from './pages';
function App() {
  return (
    <Routes>
      <Route path="" element={<DefaultLayout />}>
        <Route index element={<UserHome />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;

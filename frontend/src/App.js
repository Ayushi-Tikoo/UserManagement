import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddUpdateUser from './components/AddUpdateUser';
import ViewUsers from './components/ViewUsers';
import './App.css';
import Navbar from './components/Navbar';
import Alert from './components/Alert';

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <div className='container'>
          <Alert />
          <Routes>
            <Route path='/' element={<ViewUsers />} exact />
            <Route path='/addUser' element={<AddUpdateUser />} exact />
            <Route path='/editUser/:id' element={<AddUpdateUser />} exact />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;

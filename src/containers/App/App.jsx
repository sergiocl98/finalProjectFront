import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick={ false }
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;

import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const Layout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={3}
        pauseOnHover={false}
        closeButton={false}
        theme={'dark'}
        closeOnClick
        hideProgressBar
      />
    </>
  );
};

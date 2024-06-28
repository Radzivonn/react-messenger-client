import React from 'react';
import { Registration } from '../pages/Registration';
import { Login } from '../pages/Login';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Layout } from './Layout';
import { Main } from '../pages/Main/Main';
import { FriendList } from '../modules/Main/FriendList/FriendList';
import { RequireAuth } from '../hocs/RequireAuth';
import { NotFound } from '../pages/NotFound/NotFound';
import { UserSearch } from '../modules/Main/UserSearch/UserSearch';
import { CheckAuth } from '../hocs/CheckAuth';
import { ChatList } from '../modules/Main/ChatList/ChatList';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.base} element={<Layout />}>
          <Route index element={<Navigate to={routes.login} replace />} />
          <Route
            path={routes.main}
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          >
            <Route path={routes.chats} element={<ChatList />} />
            <Route path={routes.friends} element={<FriendList />} />
            <Route path={routes.searching} element={<UserSearch />} />
          </Route>
          <Route
            element={
              <CheckAuth>
                <Outlet />
              </CheckAuth>
            }
          >
            <Route path={routes.registration} element={<Registration />} />
            <Route path={routes.login} element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

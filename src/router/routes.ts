const routes = {
  base: '/',
  main: 'users/:id', // main page is the chat page only for auth users
  registration: 'registration',
  login: 'login',
  chats: 'chats',
  friends: 'people',
  searching: 'search',
};

const mainPageRoutes = {
  chats: routes.chats,
  friends: routes.friends,
  searching: routes.searching,
};

export { routes, mainPageRoutes };

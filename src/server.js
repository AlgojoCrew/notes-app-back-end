const Hapi = require('@hapi/hapi'); //Import Framework
const routes = require('./routes'); //Import file
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: { //Same origin policy
      cors: {
        origin: ['*'],
      },
    },
  });
 
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);

};
 
init();
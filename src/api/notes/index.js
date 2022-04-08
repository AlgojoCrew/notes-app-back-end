const NotesHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service }) => { // Fungsi untuk server & options menampung service.
    const notesHandler = new NotesHandler(service); // buatlah instance dari class NotesHandler dengan nama notesHandler. Kemudian nilai service sebagai pada constructor-nya.
    server.route(routes(notesHandler)); // Daftarkan routes yang sudah kita buat pada server Hapi
  },
};
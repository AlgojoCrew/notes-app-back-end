const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');

const routes = [
  //Post nilai catatan baru
    {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  //Get nilai catatan baru
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  //Get nilai catatan yang sudah ada
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  //Put nilai catatan yang sudah ada
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  //Delete catatan yang sudah ada
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
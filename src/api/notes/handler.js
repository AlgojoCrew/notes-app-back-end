class NotesHandler {
  constructor(service) {
    this._service = service;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }
 
  postNoteHandler(request, h) {
    try {
      const { title = 'untitled', body, tags } = request.payload; // dapatkan nilai title, tags, dan body dari request yang dikirim oleh client.
      const noteId = this._service.addNote({ title, body, tags });  // memasukan catatan baru //fungsi this._service.addNote akan mengembalikan id catatan yang disimpan, maka buatlah variabel noteId untuk menampung nilainya

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
}

  getNotesHandler(request, h) {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(request, h) {
    try {
    const { id } = request.params; // ambil nilai id note yang dikirim client melalui path parameter
    const note = this._service.getNoteById(id); // Ambil objek note sesuai id yang diberikan client.
      return { // Kembalikan respons success sesuai kode lama, tentunya dengan membawa objek note.
        status: 'success',
        data: {
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putNoteByIdHandler(request, h) {
    try {
      const { id } = request.params; // Ambil nilai id dari request.params yang digunakan pada path parameter sebagai id dari note

      this._service.editNoteById(id, request.payload); // Masukkan id sebagai parameter pertama, dan request.payload yang akan menyediakan title, body, dan tags untuk objek note baru

      return { // kembalikan response success
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteNoteByIdHandler(request, h) {
    try {
    const { id } = request.params;
      this._service.deleteNoteById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler;

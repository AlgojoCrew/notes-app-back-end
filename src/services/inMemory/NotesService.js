const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {  //fungsi CRUD untuk mengelola data pada this._notes.
    const id = nanoid(16);  //tuliskan logika dalam memasukkan catatan pada array this._notes.
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0; //Untuk memastikan newNote masuk ke dalam this._notes, kita bisa mengeceknya menggunakan fungsi filter untuk mencari berdasarkan id catatan yang baru saja dibuat (newNote), kemudian menyimpan hasilnya dalam variabel isSuccess.

    if (!isSuccess) { //Lakukan pengecekan pada variabel isSuccess. Jika bernilai false, maka buat fungsi addNotes membangkitkan Error. Sebaliknya (jika bernilai true), kembalikan fungsi dengan nilai id catatan baru.
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes() {  //buat method getNotes untuk membaca seluruh note yang disimpan
    return this._notes;
  }

  getNoteById(id) { //untuk membaca note yang disimpan berdasarkan id yang diberikan.
    const note = this._notes.filter((n) => n.id === id)[0]; //Untuk mendapatkan note berdasarkan id, kita bisa manfaatkan fungsi filter
    if (!note) { //Bila note tidak ditemukan, maka bangkitkan Error
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return note; //kembalikan fungsi dengan nilai note.
  }

  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id === id);  //memperbarui data catatan pada array this._notes
 
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }
 
    const updatedAt = new Date().toISOString();
 
    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {  //menghapus data catatan pada array this._notes
 
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
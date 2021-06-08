const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/note');
const bcrypt = require('bcrypt');
const User = require('../models/user');

beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(helper.initialNotes);
  // for (const note of helper.initialNotes) {
  //   const noteObject = new Note(note);
  //   await noteObject.save();
  // }

  // const noteObjects = helper.initialNotes.map(async note => new Note(note));
  // const promiseArray = noteObjects.map(note => {
  //   console.log(note);
  //   note.save();
  // });
  // await Promise.all(promiseArray);
});

describe('general GET', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const res = await api.get('/api/notes');
    expect(res.body).toHaveLength(helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const res = await api.get('/api/notes');

    const contents = res.body.map(r => r.content);
    expect(contents).toContain('Browser can execute only Javascript');
  });
});

describe('specific GET', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToView = notesAtStart[0];
    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const processedNoteToview = JSON.parse(JSON.stringify(noteToView));
    expect(resultNote.body).toEqual(processedNoteToview);
  });

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonExisingId = await helper.nonExistingId();
    await api.get(`/api/notes/${validNonExisingId}`).expect(404);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';
    await api.get(`/api/notes/${invalidId}`);
  });
});

describe('addition of a new note / POST', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map(n => n.content);
    expect(contents).toContain('async/await simplifies making async calls');
  });

  test('fails with statuscode 400 if data is invalid', async () => {
    const newNote = {
      important: true,
    };
    await api.post('/api/notes').send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe('deletion of a note / DELETE', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];
    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);
    const contents = notesAtEnd.map(r => r.content);
    expect(contents).not.toContain(noteToDelete.content);
  });
});

describe('when there is only one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'groot', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Daawa',
      name: 'Theo Leveque',
      password: 'Whistler',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with 400 and proper message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'groot',
      name: 'SuperUser',
      password: 'thanks',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

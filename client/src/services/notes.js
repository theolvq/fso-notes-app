import axios from 'axios';

const baseUrl = '/api/notes';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(res => res.data);
};

const deleteNote = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(res => res.data);
};

const update = (newObject, id) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(res => res.data);
};

const noteService = {
  getAll,
  create,
  deleteNote,
  update,
};

export default noteService;

const route = 'http://localhost:4400';

/**
 *
 * @param {string} url
 * @param {Function} callback
 * @param {string|undefined} method
 * @param {any} body
 */

export function sendRequest(url, callback, method = 'GET', body = null) {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.send(body);
  request.onload = function () {
    const response = JSON.parse(request.response);

    callback(response);
  };
}

export function getNotes(callback) {
  sendRequest(`${route}/api/v1/notes`, callback);
}

export function createNote(callback, body) {
  sendRequest(`${route}/api/v1/notes`, callback, 'POST', body);
}

export function deleteNote(callback, id) {
  sendRequest(`${route}/api/v1/notes/${id}`, callback, 'DELETE');
}





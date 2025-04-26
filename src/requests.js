const route = 'http://localhost:4400';

/**
 *
 * @param {string} url
 * @param {string|undefined} method
 * @param {any} body
 */

export function sendRequest(url, method = 'GET', body = null) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send(body);
    request.onload = function () {
      const isStatusError = request.status >= 400 && request.status <= 500;

      if (isStatusError) {
        const error = new Error('server error');
        error.data = JSON.parse(request.response);

        reject(error);
        return;
      }

      const response = JSON.parse(request.response);

      resolve(response);
    };

    request.onerror = function () {
      reject(new Error('network error'));
    };
  });
}

export function getNotes() {
  return sendRequest(`${route}/api/v1/notes`).catch(function (error) {
    console.error(`Impossible to get notes: ${error}`);
  });
}

export function createNote(body) {
  return sendRequest(`${route}/api/v1/notes`, 'POST', body).catch(
    function (error) {
      console.error(`Impossible to create note: ${error}`);
    },
  );
}

export function deleteNote(id) {
  return sendRequest(`${route}/api/v1/notes/${id}`, 'DELETE').catch(
    function (error) {
      console.error(`Impossible to delete note: ${error}`);
    },
  );
}

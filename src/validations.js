
/**
 *
 * @param {HTMLTextAreaElement} text
 * @param {HTMLDivElement} error
 * @returns {boolean}
 */

export function validateInput(text, error) {
  const minLength = 6;
  const maxLength = 300;

  if (text.value.length < minLength) {
    text.classList.add('is-invalid');
    error.innerText = `Note text must be more than ${minLength} letters`;

    return false;
  } else if (text.value.length > maxLength) {
    text.classList.add('is-invalid');
    error.innerText = `Note text must be less than ${maxLength} letters`;

    return false;
  } else {
    text.classList.remove('is-invalid');
    return true;
  }
}

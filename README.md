# template-vanilla


# 📋 Task for Students: API Integration with Form and Validation

## 1️⃣ Connect the Form to an [API](https://github.com/rammfall-code/api-simple-notes)
- Set up an API endpoint to handle form submissions (`POST` request).
- Configure the form to send data to this API when the **"Submit"** button is clicked.

## 2️⃣ Implement Form Validation
- Validate the `textarea` input before sending data to the API.
- Add the `is-invalid` class to the `textarea` if the input is empty or invalid to:
  - Trigger the red border.
  - Display the error message inside the `invalid-feedback` element.
- If the input is valid:
  - Remove the `is-invalid` class.
  - (Optional) Add the `is-valid` class to show successful validation.

## 3️⃣ Validation Classes Explanation
- **`is-invalid`**: Highlights the form control with a red border and shows the error message within an element using the `invalid-feedback` class.
- **`is-valid`** *(optional)*: Highlights the form control with a green border to indicate successful validation.
- **`invalid-feedback`**: Displays validation error messages, becoming visible when the associated form control has the `is-invalid` class.

## 4️⃣ Submit Valid Data to the API
- If the validation passes:
  - Send the note text to the API using an asynchronous request (`XMLHTTPRequest`).
  - After a successful response:
    - Clear the form.
    - Update the notes list with the new note.

## 5️⃣ Retrieve and Display Notes from the API
- Create a `GET` request to fetch all notes from the API.
- Dynamically generate note cards based on the API response using the existing card structure:

```html
<div class="card mb-4">
  <h5 class="card-header">Note Title</h5>
  <div class="card-body">
    <button class="btn btn-danger">Delete</button>
  </div>
</div>
```
## 6️⃣ Delete Notes
- Implement delete functionality:
  - Send a ```DELETE``` request to the API when the "Delete" button is clicked.
  - After a successful delete operation:
    - Remove the corresponding note card from the UI without reloading the page.
## 🎯 Bonus: Improve User Experience
- Disable the "Submit" button while the API request is in progress to prevent duplicate submissions.
- Add loading indicators or success messages after:
  - Form submission.
  - Note deletion.

## Criteria:

- Resolve all errors in the file
- Ensure the code is properly formatted using ESLint (our [pipeline](https://github.com/rammfall-code/guidelines/blob/main/DICTIONARY.md#pipeline-a-pipeline-is-a-sequence-of-automated-steps-that-run-code-checks-it-is-triggered-in-github-after-code-is-pushed-the-pipeline-can-have-three-statuses-pending-checks-are-in-progress-failed-checks-did-not-pass-due-to-issues-like-incorrect-code-errors-or-failed-tests-and-passed-all-checks-were-successful) checks for this).
- The code must comply with the project [guidelines](https://github.com/rammfall-code/guidelines/blob/main/JS.md).
- Pass validation without any errors in [validator](https://validator.w3.org/nu/)
- Additionally, follow all [git guidelines](https://github.com/rammfall-code/guidelines/blob/main/GIT.md) to avoid issues.

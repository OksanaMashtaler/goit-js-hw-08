import throttle from 'lodash.throttle';

const FORM_STATE_KEY = 'feedback-form-state';

const formRef = {
  form: document.querySelector('.feedback-form'),
  mail: document.querySelector('.feedback-form input[name="email"]'),
  text: document.querySelector('.feedback-form textarea[name="message"]'),
};

function onFormChanged(event) {
  setValueForInput('email', event);
  setValueForInput('message', event);

  localStorage.setItem(FORM_STATE_KEY, JSON.stringify(newFormValues));
}

function setValueForInput(name, event) {
  if (event.srcElement.name === name) {
    newFormValues[name] = event.srcElement.value;
  }
}

const throtlledOnFormChanged = throttle(event => onFormChanged(event), 500);
formRef.form.addEventListener('input', throtlledOnFormChanged);

let newFormValues = {
  email: '',
  message: '',
};

function populateDataOnFormFromStorage() {
  try {
    let data = localStorage.getItem(FORM_STATE_KEY);
    if (!data) {
      return;
    }

    newFormValues = JSON.parse(data);

    formRef.mail.value = newFormValues.email;
    formRef.text.value = newFormValues.message;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

populateDataOnFormFromStorage();

function onSubmit(event) {
  event.preventDefault();

  formRef.form.reset();
  localStorage.removeItem(FORM_STATE_KEY);

  console.log(newFormValues);

  newFormValues.email = '';
  newFormValues.message = '';
}

formRef.form.addEventListener('submit', onSubmit);

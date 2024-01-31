import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = form.querySelector('.input-number');

inputDelay.addEventListener('input', onInputDelayClick);
form.addEventListener('submit', onSubmitClick);

let delay;
function onInputDelayClick(e) {
  delay = e.currentTarget.value;
};

function onSubmitClick(e) {
 e.preventDefault();

  function promise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }

  promise(delay, form.elements.state.value)
    .then(value => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${value} ms`,
        messageColor: '#FFFFFF',
        backgroundColor: '#59A10D',
        position: 'topCenter',
      });
    })
    .catch(value => {
      iziToast.show({
        message: `❌ Rejected promise in ${value} ms`,
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        position: 'topCenter',
      });
    });
  form.reset();
};








import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const inputForm = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');

const daysSet = document.querySelector('span[data-days]');
const hoursSet = document.querySelector('span[data-hours]');
const minutesSet = document.querySelector('span[data-minutes]');
const secondsSet = document.querySelector('span[data-seconds]');

let userSelectedDate;
let difference;
let timerIntervalId;

btnOff();
inputOn();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      
    if (userSelectedDate > new Date()) {
      btnOn();
    } else {
      btnOff();
        iziToast.show({
            close: true,
            message: 'Оберіть дату в майбутньому',
            messageColor: '#FFFFFF',
            backgroundColor: '#B51B1B',
            position: 'topCenter',
            close: true,
            timeout: 5000
        });
    }
},
};
 
flatpickr('#datetime-picker', options);

btn.addEventListener('click', onBtnStartClick);

function onBtnStartClick(e) {
  btnOff();
  inputOff();
   
  // запускаємо інтервал в 1000мс: виводимо difference на екран 
  timerIntervalId = setInterval(() => {
    difference = userSelectedDate - new Date();
      
    if (difference>1000) {
       // конвертуємо ms в дні-години-хвилини-секунди і форматуємо в двозначний вигляд 
        const difObj = convertMs(difference);
        const difArray = Object.values(difObj).map((elem) => String(elem).padStart(2, 0));
        // виводимо дні-години-хвилини-секунди на екран
        daysSet.textContent = difArray[0];
        hoursSet.textContent = difArray[1];
        minutesSet.textContent = difArray[2];
        secondsSet.textContent = difArray[3];
    } else {
      timerIntervalStop();
    }

 }, 1000);
  
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

   const days = Math.floor(ms / day);
   const hours = Math.floor((ms % day) / hour);
   const minutes = Math.floor(((ms % day) % hour) / minute);
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timerIntervalStop(e) {
  clearInterval(timerIntervalId);
  secondsSet.textContent = '00';
  inputOn();

  // перевірка на закінчення таймера
  if (difference <= 1000) {
    greeting();
    console.log('цей час настав!')
  } else {
    console.log('таймер зупинено')
  }
} 

function greeting() {
    iziToast.show({
      close: true,
      message: 'Цей час настав!',
      messageColor: '#060695',
      backgroundColor: '#ffff00',
      position: 'topCenter',
      close: true,
      timeout: 10000
    });
}

function btnOff() {
  btn.disabled = true;
  btn.style.backgroundColor = '#989898';
  btn.style.boxShadow = '';
}

function btnOn() {
  btn.disabled = false;
  btn.style.backgroundColor = '#4e75ff';
  btn.style.boxShadow = '5px 5px 18px 2px royalblue';
}

function inputOn() {
  inputForm.disabled = false;
  inputForm.style.borderColor = 'blue';
  inputForm.style.color = '#000000;'; 
}
function inputOff() {
  inputForm.disabled = true;
  inputForm.style.color = '#808080'; 
  inputForm.style.borderColor = '#808080';
}
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';


const btn = document.querySelector('button');

const daysSet = document.querySelector('span[data-days]');
const hoursSet = document.querySelector('span[data-hours]');
const minutesSet = document.querySelector('span[data-minutes]');
const secondsSet = document.querySelector('span[data-seconds]');

let userSelectedDate;
let difference;
let timerIntervalId;

btn.disabled = true;
btn.classList.add('disable-btn');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
       userSelectedDate = selectedDates[0];
      
      if (userSelectedDate > new Date()) {
        console.log('userSelectedDate: ', userSelectedDate);
     
        btn.disabled = false;
        btn.classList.remove('disable-btn');
    } else {
    //   btn.setAttribute('disabled', true);
        btn.classList.add('disable-btn');
        console.log('wrong date: ', userSelectedDate);
        
          iziToast.show({
            close: true,
            message: 'Оберіть дату в майбутньому',
            messageColor: '#FFFFFF',
            backgroundColor: '#B51B1B',
              position: 'topCenter',
                close: true,
               timeout: 10000
        });
    }
},
};
 
flatpickr('#datetime-picker', options);

btn.addEventListener('click', onBtnStartClick);

function onBtnStartClick(e) {
    document.addEventListener('keydown', onKeyClick); 
    difference = userSelectedDate - new Date();
    console.log('click btn difference', difference);


    timerIntervalId = setInterval(() => {
        difference -= 1000;

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
        clearInterval(timerIntervalId);
        secondsSet.textContent = '00';
        console.log('Цей час настав!');
        greeting();
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

function onKeyClick(e) {
  if (e.code === 'Escape') {
    clearInterval(timerIntervalId);
      console.log('таймер зупинено');
    //    document.addEventListener('keydown', onKeyClick); 
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
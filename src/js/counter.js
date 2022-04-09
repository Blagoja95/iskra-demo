const indexes = document.querySelector(".key-indexes");
const numbers = document.querySelectorAll(".key-index__number");

const revenue = document.querySelector(".key-revenue__number");
const customers = document.querySelector(".key-customers__number");
const production = document.querySelector(".key-production__number");
const greenfield = document.querySelector(".key-greenfield__number");
const inovation = document.querySelector(".key-inovation__number");

//rev cust fac green hub
// 81 100 3 2 1

// to fire animation only once
let state = true;
const counterNumber = function (entries) {
  entries.forEach((entrie) => {
    // animation will be fired only once
    if (state && entrie.isIntersecting) {
      // last value is duration (ms);
      startCounting(revenue, 0, 81, 1000);
      startCounting(customers, 0, 100, 2000);
      startCounting(production, 0, 3, 2000);
      startCounting(greenfield, 0, 2, 2000);
      startCounting(inovation, 0, 1, 2200);
      state = false;
    }
  });
};

function startCounting(obj, initVal, lastVal, duration) {
  let startTime = null;

  // get the current timestamp and assign it to the currentTime variable
  let currentTime = Date.now();

  // pass the current timestamp to the step function
  const step = (currentTime) => {
    // if the start time is null, assign the current time to startTime
    if (!startTime) {
      startTime = currentTime;
    }

    // calculate the value to be used in calculating the number to be displayed
    const progress = Math.min((currentTime - startTime) / duration, 1);

    //calculate what to be displayed using the value gotten above
    obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

    //checking to make sure the counter does not exceed the last value (lastVal)
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(window.requestAnimationFrame(step));
    }
  };

  //start animating
  window.requestAnimationFrame(step);
}

// intersection observer
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observer = new IntersectionObserver(counterNumber, options);

// init
numbers.forEach((numb) => (numb.innerHTML = 0));
observer.observe(indexes);

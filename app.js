// https://www.youtube.com/watch?v=c5SIG7Ie0dM
// 5 hs  45'  30''
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


const giveawayHeading = document.querySelector('.giveaway');
const deadlineContainer = document.querySelector('.deadline');
const timeBits = document.querySelectorAll('.deadline-format h4');


/*
	-> Params
	year, month, day, minutes, seconds, milliseconds
*/
//let futureDate = new Date(2021, 11, 20, 22, 19, 25);
//console.log(futureDate);

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

// the easy picks
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
let minutes = futureDate.getMinutes();

// the hard picks
// Careful, because month param is 0 indexed...
const monthIndex = futureDate.getMonth();
console.log('Watch out wrong month = ', monthIndex);
console.log(`The correct month is ${monthIndex} + 1 = ${months[monthIndex]}`);
const actualMonth = months[monthIndex] ;

const dayOfTheWeekIndex = futureDate.getDay();
console.log(`JavaScript getDay() brings the day of the week with 0 index based array = ${dayOfTheWeekIndex}`);
const dayOfTheWeek = weekdays[dayOfTheWeekIndex];

const dayOfTheMonth = futureDate.getDate();
console.log(dayOfTheMonth);


let periodOfDay
if (hours < 12) {
	periodOfDay = 'am';
} else {
	periodOfDay = 'pm';
}

if (minutes < 10) {
	minutes = `0${minutes}`;
}

giveawayHeading.textContent = `giveaway ends on ${dayOfTheWeek}, ${dayOfTheMonth} ${actualMonth} ${year}, ${hours}:${minutes}${periodOfDay}`;


// future time in milliseconds
const futureTime = futureDate.getTime();
console.log('Time in milliseconds = ', futureTime);


/*
	Understanding the time in milliseconds
	-> 1s = 1000ms
	-> 1m = 60s
	-> 1hr = 60min
	-> 1d = 24hr
*/
function getRemainingTimeAndRenderHtml() {
	const today = new Date().getTime();
	console.log(today);
	
	const t = futureTime - today;
	console.log(t);
	
	// values in ms
	const oneDay = 24 * 60 * 60 * 1000;
	const oneHour = 60 * 60 * 1000;
	const oneMinute = 60 * 1000;
	
	// calculate value
	let days = Math.floor(t / oneDay);
	let hours = Math.floor((t % oneDay) / oneHour);
	let minutes = Math.floor((t % oneHour) / oneMinute);
	let seconds = Math.floor((t % oneMinute) / 1000);
	
	// set values array
	const values = [days, hours, minutes, seconds];
	
	// format the timteBits
	function formatTimeBits(value) {
		if (value < 10) return value = `0${value}`;
		
		return value;
	};
	
	timeBits.forEach(function(timeBit, index) {
		timeBit.innerHTML = formatTimeBits(values[index]);
	});
	
	if (t < 0) {
		clearInterval(countdown);
		deadlineContainer.innerHTML = `<h4 class="expired" style="color: orangered;">sorry, this giveaway has expired</h4>`;
	}
};


// countdown
let countdown = setInterval(getRemainingTimeAndRenderHtml, 1000);

/*
	Atention: as setInterval is assincronous, withou this starting function bellow, we you be printing the HTML's hardcoded value.....
*/
getRemainingTimeAndRenderHtml();



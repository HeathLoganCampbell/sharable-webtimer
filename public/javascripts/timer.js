const SEC_IN_MINS = 60;
const MINS_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;
const DAYS_IN_YEAR = 365;
const WEEKS_IN_YEAR = 52;

/**
The last item has an and
Example:
cookie, cow, milk and ice cream
*/
function toFormatedListAnd(array) {
    if (array.length > 1) {
        var lastIndex = array.length - 1;
        var secondLastIndex = lastIndex - 1;
        array[secondLastIndex] = array[secondLastIndex] + " and " + array[lastIndex];
        array.pop();
    }
    return array.join(", ");
}

/** 
Returns minutes, hours, days, week, years

*/
function secondsToUnits(rawSeconds) {
    if (rawSeconds === NaN || rawSeconds === undefined) rawSeconds = 0;
    var rawMinutes = (rawSeconds / SEC_IN_MINS) | 0;
    var rawHours = (rawMinutes / MINS_IN_HOUR) | 0;
    var rawDays = (rawHours / HOURS_IN_DAY) | 0;
    var rawWeeks = (rawDays / DAYS_IN_WEEK) | 0;
    var rawYears = (rawWeeks / WEEKS_IN_YEAR) | 0;

    var seconds = rawSeconds % SEC_IN_MINS;
    var minutes = rawMinutes % MINS_IN_HOUR;
    var hours = rawHours % HOURS_IN_DAY;
    var days = rawDays % DAYS_IN_WEEK;
    var weeks = (rawWeeks) % WEEKS_IN_YEAR;
    var years = rawYears;

    return {
        seconds,
        minutes,
        hours,
        days,
        weeks,
        years
    };
}

/**

converts seconds to years, weeks, days, hours, minutes
and seconds

Example
toFormatedString(5900)
"1 hours, 38 minutes and 20 seconds"
*/
function toFormatedString(rawSeconds) {
    var { seconds, minutes, hours, days, weeks, years } = secondsToUnits(rawSeconds)

    var resultList = new Array();
    if (years >= 1)
        resultList.push(years + " year" + (years == 1 ? "" : "s"));
    if (weeks > 0)
        resultList.push((weeks) + " week" + (weeks == 1 ? "" : "s"));
    if (days >= 1)
        resultList.push((days) + " day" + (days == 1 ? "" : "s"));
    if (hours >= 1)
        resultList.push((hours) + " hour" + (hours == 1 ? "" : "s"));
    if (minutes >= 1)
        resultList.push((minutes) + " minute" + (minutes == 1 ? "" : "s"));
    if (seconds > 0)
        resultList.push((seconds) + " second" + (seconds == 1 ? "" : "s"));

    return toFormatedListAnd(resultList);
}

/*

*/
function doubleDigit(digit) {
    return (digit < 10 ? "0" : "") + digit;
}

/**
Covert seconds to timer format
HH:MM:SS

Then also if days, weeks and years are given
YY:WW:DD,HH:MM:SS
*/
function toTimerString(rawSeconds) {
    var { seconds, minutes, hours, days, weeks, years } = secondsToUnits(rawSeconds);

    var currentCount = "";
    if (days > 0 || weeks > 0 || years > 0) {
        currentCount += doubleDigit(years) + ":"
        currentCount += doubleDigit(weeks) + ":"
        currentCount += doubleDigit(days) + "|"
    }

    currentCount += doubleDigit(hours) + ":"
    currentCount += doubleDigit(minutes) + ":"
    currentCount += doubleDigit(seconds);

    return currentCount;
}

function setTimerContents(value) {
    var timerEle = document.getElementById("timer");
    if (timerEle !== undefined)
        timerEle.innerHTML = value;
}


function setTimerSetForContents(value) {
    var timerEle = document.getElementById("timerSetFor");
    if (timerEle !== undefined)
        timerEle.innerHTML = value;
}

class FavProgress {
    constructor(currentSeconds, maxSeconds) {
        this.currentSeconds = currentSeconds;
        this.maxSeconds = maxSeconds;
        this.percent = this.currentSeconds / this.maxSeconds;

        this.linkEl = document.createElement('link');
        this.linkEl.rel = 'icon';
        document.head.appendChild(this.linkEl);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = 32;
        this.context = this.canvas.getContext('2d');

        this.linkEl.href = this.canvas.toDataURL('image/png');
    }

    update(currentSeconds) {
        this.currentSeconds = currentSeconds;
        this.percent = this.currentSeconds / this.maxSeconds;
        this.render();
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderChart(this.percent);
        this.linkEl.href = this.canvas.toDataURL('image/png');
    }

    renderChart(percentage) {
        var context = this.context;
        var center = this.canvas.width / 2;

        var startAngle = Math.PI / 2;
        var endAngle = startAngle - Math.PI * 2 * percentage;

        var colorOne = { R: 231, G: 76, B: 60 }
        var colorTwo = { R: 46, G: 204, B: 113 }

        context.fillStyle = 'rgb(' + (colorOne.R + ((colorTwo.R - colorOne.R) * percentage)) + ', ' + (colorOne.G + ((colorTwo.G - colorOne.G) * percentage)) + ', ' + (colorOne.B + ((colorTwo.B - colorOne.B) * percentage)) + ')';
        context.beginPath();
        context.moveTo(center, center);
        context.arc(center, center, center, endAngle, startAngle, false);
        context.lineTo(center, center);
        context.closePath();
        context.fill();
    }
}
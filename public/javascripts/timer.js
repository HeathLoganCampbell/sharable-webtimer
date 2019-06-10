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
        resultList.push(years + " years");
    if (weeks > 0)
        resultList.push((weeks) + " weeks");
    if (days >= 1)
        resultList.push((days) + " days");
    if (hours >= 1)
        resultList.push((hours) + " hours");
    if (minutes >= 1)
        resultList.push((minutes) + " minutes");
    if (seconds > 0)
        resultList.push((seconds) + " seconds");

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


function seTimerSetForContents(value) {
    var timerEle = document.getElementById("timerSetFor");
    if (timerEle !== undefined)
        timerEle.innerHTML = value;
}
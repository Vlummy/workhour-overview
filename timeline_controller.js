var start = "";
var end = "";
var date = "";
var eventListObjects = [];
var selectedEvent = "";
var ubAddOnObjects = {
    ub_22: {
        start: '18:00',
        end: '21:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        add_on: 22,
        add_on_min: (22 / 60),
    },
    ub_45: {
        start: '21:00',
        end: ' ',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        add_on: 45,
        add_on_min: (45 / 60)
    },
    ub_45_sat: {
        start: '13:00',
        end: '16:00',
        days: ['Saturday'],
        add_on: 45,
        add_on_min: (45 / 60)
    },
    ub_90: {
        start: '16:00',
        end: ' ',
        days: ['Saturday'],
        add_on: 90,
        add_on_min: (90 / 60)
    },
    ub_96: {
        start: ' ',
        end: ' ',
        days: ['Sunday'],
        add_on: 96,
        add_on_min: (96 / 60)
    }
};

$(function () {
    $('#myTimeline').timeline({
        scale: 'months',
        rows: 1,
        range: 2,
    });
});

(function () {
    if(localStorage.length > 0) {
        for(var i = 0; i < localStorage.length; i++) {
            let event = localStorage.getItem(localStorage.key(i));
            event = JSON.parse(event);
            eventListObjects.push(event);
        }
    }
})();

(function () {
    var workhourTable = document.getElementsByClassName('workhour-table')[0];
    for(var event in eventListObjects) {
        var row = insertTableRow(workhourTable);
        var label = eventListObjects[event].label;
        var duration = eventListObjects[event].hours;
        var day = eventListObjects[event].day;
        var startTime = eventListObjects[event].start.match(/\d\d:\d\d/);
        var endTime = eventListObjects[event].end.match(/\d\d:\d\d/);

        var dateCell = label;
        var startTimeCell = startTime[0];
        var endTimeCell = endTime[0];

        var ub22Cell = (eventListObjects[event].ub_22.hours !== undefined)?eventListObjects[event].ub_22.hours:' ';
        var ub45Cell = (eventListObjects[event].ub_45.hours !== undefined)?eventListObjects[event].ub_45.hours:' ';
        var ub45SatCell = (eventListObjects[event].ub_45_saturday.hours !== undefined)?eventListObjects[event].ub_45_saturday.hours:' ';
        var ub90Cell = (eventListObjects[event].ub_90.hours !== undefined)?eventListObjects[event].ub_90.hours:' ';
        var ub96Cell = (eventListObjects[event].ub_96.hours !== undefined)?eventListObjects[event].ub_96.hours:' ';

        insertRowCell(row, dateCell);
        insertRowCell(row, day);
        insertRowCell(row, startTimeCell);
        insertRowCell(row, endTimeCell);
        insertRowCell(row, duration);
        insertRowCell(row, ub22Cell);
        insertRowCell(row, ub45Cell);
        insertRowCell(row, ub45SatCell);
        insertRowCell(row, ub90Cell);
        insertRowCell(row, ub96Cell);

        calculateTotalHours();

    }

})();

function calculateTotalHours() {
    var totalHoursCell = document.getElementById('total-hours-cell');
    var ub22TotalCell = document.getElementById('ub22-cell');
    var ub45TotalCell = document.getElementById('ub45-cell');
    var ub45SatTotalCell = document.getElementById('ub45sat-cell');
    var ub90TotalCell = document.getElementById('ub90-cell');
    var ub96TotalCell = document.getElementById('ub96-cell');


    var totalMinutes = 0;
    var totalub22Minutes = 0;
    var totalub45Minutes = 0;
    var totalub45SatMinutes = 0;
    var totalub90Minutes = 0;
    var totalub96Minutes = 0;
    for(var event in eventListObjects) {
        if(eventListObjects[event].minutes !== "") {
            totalMinutes = (totalMinutes + eventListObjects[event].minutes);
        }
        if(eventListObjects[event].ub_22.minutes !== "") {
            totalub22Minutes = (totalub22Minutes + eventListObjects[event].ub_22.minutes);
            console.log(totalub22Minutes);
        }
        if(eventListObjects[event].ub_45.minutes !== "") {
            totalub45Minutes = (totalub45Minutes + eventListObjects[event].ub_45.minutes);
        }
        if(eventListObjects[event].ub_45_saturday.minutes !== "") {
            totalub45SatMinutes = (totalub45SatMinutes + eventListObjects[event].ub_45_saturday.minutes);
        }
        if(eventListObjects[event].ub_90.minutes !== "") {
            totalub90Minutes = (totalub90Minutes + eventListObjects[event].ub_90.minutes);
        }
        if(eventListObjects[event].ub_96.minutes !== "") {
            totalub96Minutes = (totalub96Minutes + eventListObjects[event].ub_96.minutes);
        }
    }
    var totalHours = (totalMinutes / 60);
    var totalub22Hours = (totalub22Minutes / 60);
    var totalub45Hours = (totalub45Minutes / 60);
    var totalub45SatHours = (totalub45SatMinutes / 60);
    var totalub90Hours = (totalub90Minutes / 60);
    var totalub96Hours = (totalub96Minutes / 60);
    totalHoursCell.innerText = round(totalHours, 2);
    ub22TotalCell.innerText = round(totalub22Hours, 2);
    ub45TotalCell.innerText = round(totalub45Hours, 2);
    ub45SatTotalCell.innerText = round(totalub45SatHours, 2);
    ub90TotalCell.innerText = round(totalub90Hours, 2);
    ub96TotalCell.innerText = round(totalub96Hours, 2);
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function getDayByMonth(date) {
    var d = new Date(date);
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[d.getDay()];
}

function insertTableRow(table) {
    var row = table.insertRow();
    return row;
}

function insertRowCell(row, data) {
    var cell = row.insertCell();
    cell.innerHTML = data;
}

function addManualEvent() {
    var startTimeStamp = document.getElementById('startStamp').value;
    var startDateStamp = document.getElementById('startDateStamp').value;

    var endTimeStamp = document.getElementById('endStamp').value;
    var endDateStamp = document.getElementById('endDateStamp').value;
    start = startDateStamp + ' ' + startTimeStamp;
    end = endDateStamp + ' ' + endTimeStamp;
    date = startDateStamp;
    buildEvent();
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showAllEvents, 1000);
}, false);

function showAllEvents() {
    if(eventListObjects.length > 0) {
        $('#myTimeline').timeline('addEvent', eventListObjects);
    }
    else {
        console.log('No Events Found');
    }
}

function clearEvents() {
    localStorage.clear();
    alert('All Events Deleted!')
    location.reload();
}

function changeZoom(state) {
    if(state.innerText === 'Month') {
        $('#myTimeline').timeline('render', {
            scale: 'days',
            rows: 1,
            range: 2,
        });
        state.innerText = 'Day';
    }
    else if(state.innerText === 'Day') {
        $('#myTimeline').timeline('render', {
            scale: 'years',
            rows: 1,
            range: 2,
        });
        state.innerText = 'Year';
    }
    else if(state.innerText === 'Year') {
        $('#myTimeline').timeline('render', {
            scale: 'months',
            rows: 1,
            range: 2,
        });
        state.innerText = 'Month';
    }
}

function removeEvent() {
    var eventId = selectedEvent.id.replace( /^\D+/g, '');
    console.log(localStorage);
    localStorage.removeItem(eventId);
    console.log(localStorage);
    location.reload();
}

$.openEvent = function() {
    selectedEvent = $('.timeline-node.active')[0];
};

function startWork() {
    start = getDateOnly() + ' ' + getTimeOnly();
}

function buildEvent() {
    var regEx = new RegExp(/(\d)(\d)(\d)(\d)(-)(\d)(\d)(-)(\d)(\d)(\s+)(\d)(\d)(:)(\d)(\d)/);

    if(regEx.test(start) && regEx.test(end)) {
        var durationHours = moment
            .duration(moment(end, 'YYYY/MM/DD HH:mm')
                .diff(moment(start, 'YYYY/MM/DD HH:mm'))).asHours();
        var durationMinutes = moment
            .duration(moment(end, 'YYYY/MM/DD HH:mm')
                .diff(moment(start, 'YYYY/MM/DD HH:mm'))).asMinutes();

        if(Math.sign(durationHours) === -1) {
            alert('You ended your work day after midnight, this means that the end date must be greater then start date.')
        }
        else {
            var weekDay = getDayByMonth(date);
            let event = {
                start: start,
                end: end,
                hours: Math.round(durationHours * 100) / 100,
                minutes: durationMinutes,
                row: 1,
                label: date,
                day: weekDay,
                callback: '$.openEvent()',
                ub_22: calculateUB22(this.start.match(/\d\d:\d\d/)[0], this.end.match(/\d\d:\d\d/)[0], date, weekDay),
                ub_45: calculateUB45(this.start.match(/\d\d:\d\d/)[0], this.end, date, weekDay),
                ub_45_saturday: calculateUB45Saturday(this.start.match(/\d\d:\d\d/)[0], this.end.match(/\d\d:\d\d/)[0], date, weekDay),
                ub_90: calculateUB90(this.start.match(/\d\d:\d\d/)[0], this.end, date, weekDay),
                ub_96: calculateUB96(this.start, this.end, weekDay)
            };

            $('#myTimeline').timeline('addEvent', [event]);
            localStorage.setItem(event.eventId, JSON.stringify(event));
            location.reload();
        }
    }
    else {
        alert('All fields must be entered');
    }
}

function stopWork() {
    end = getDateOnly() + ' ' + getTimeOnly();
    buildEvent();
}

function getDateOnly() {
    var theDate = new Date();
    var year = theDate.getFullYear();
    var month = theDate.getMonth() + 1;
    var day = theDate.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    var onlyDate = year + '-' + month + '-' + day;
    date = onlyDate;
    return onlyDate;
}

function getTimeOnly() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    if(hour < 10) {
        hour = '0' + hour;
    }
    if(min < 10) {
        min = '0' + min;
    }
    var time = hour + ':' + min;
    return time;
}

function calculateUB22(startTime, endTime, date, day) {
    var ub_22 = ubAddOnObjects.ub_22;
    var start = startTime;
    var end = endTime;

    var justified_ub = {
        start: '',
        end: '',
        hours: '',
        minutes: '',
    };

    if(end.startsWith('00:')) {
        end = end.replace('00:', '24:');
    }
    if(end.startsWith('01:')) {
        end = end.replace('01:', '25:');
    }
    if(end.startsWith('02:')) {
        end = end.replace('02:', '26:');
    }
    if(end.startsWith('03:')) {
        end = end.replace('03:', '27:');
    }
    if(end.startsWith('04:')) {
        end = end.replace('04:', '28:');
    }


    if(ub_22.days.includes(day)) {
        if(start <= ub_22.start && end >= ub_22.end) {
            justified_ub.start = date + ' ' + ub_22.start;
            justified_ub.end = date + ' ' + ub_22.end;
        }

        if(start < ub_22.start && end < ub_22.end) {
            justified_ub.start = date + ' ' + ub_22.start;
            justified_ub.end = date + ' ' + end;
        }

        if(start > ub_22.start && end > ub_22.end) {
            justified_ub.start = date + ' ' + start;
            justified_ub.end = date + ' ' + ub_22.end;
        }

        if(start > ub_22.start && end < ub_22.end) {
            justified_ub.start = date + ' ' + start;
            justified_ub.end = date + ' ' + end;
        }
        if(start > ub_22.start) {
            if(end <= ub_22.end) {
                justified_ub.start = date + ' ' + start;
                justified_ub.end = date + ' ' + end;
            }
        }
    }


    justified_ub.hours = Math.round(moment
        .duration(moment(justified_ub.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(justified_ub.start, 'YYYY/MM/DD HH:mm'))).asHours() * 100) / 100;

    justified_ub.minutes = moment
        .duration(moment(justified_ub.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(justified_ub.start, 'YYYY/MM/DD HH:mm'))).asMinutes();

    if(Math.sign(justified_ub.hours) === -1) {
        justified_ub.start = '';
        justified_ub.end = '';
        justified_ub.hours = '';
        justified_ub.minutes = '';
    }

    return justified_ub;
}

function calculateUB45(start, end, date, day) {
    var ub_45 = ubAddOnObjects.ub_45;

    var justified_ub = {
        start: '',
        end: '',
        hours: '',
        minutes: '',
    }

    if(ub_45.days.includes(day)) {
        if(start <= ub_45.start && end.match(/\d\d:\d\d/)[0] > ub_45.end) {
            justified_ub.start = date + ' ' + ub_45.start;
            justified_ub.end = end;
        }

        if(start > ub_45.start && end.match(/\d\d:\d\d/)[0] > ub_45.end) {
            justified_ub.start = date + ' ' + start;
            justified_ub.end = end;
        }
    }

    justified_ub.hours = Math.round(moment
        .duration(moment(justified_ub.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(justified_ub.start, 'YYYY/MM/DD HH:mm'))).asHours() * 100) / 100;


    justified_ub.minutes = moment
        .duration(moment(justified_ub.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(justified_ub.start, 'YYYY/MM/DD HH:mm'))).asMinutes();

    if(Math.sign(justified_ub.hours) === -1) {
        justified_ub.start = '';
        justified_ub.end = '';
        justified_ub.hours = '';
        justified_ub.minutes = '';
    }

    return justified_ub;
}

function calculateUB45Saturday(startTime, endTime, date, day) {
    var ub_45_sat = ubAddOnObjects.ub_45_sat;
    var start = startTime;
    var end = endTime;

    var justified_ub = {
        start: '',
        end: '',
        hours: '',
        minutes: '',
    };

    if(end.startsWith('00:')) {
        end = end.replace('00:', '24:');
    }
    if(end.startsWith('01:')) {
        end = end.replace('01:', '25:');
    }
    if(end.startsWith('02:')) {
        end = end.replace('02:', '26:');
    }
    if(end.startsWith('03:')) {
        end = end.replace('03:', '27:');
    }
    if(end.startsWith('04:')) {
        end = end.replace('04:', '28:');
    }

    if(ub_45_sat.days.includes(day)) {
        if(start <= ub_45_sat.start && end >= ub_45_sat.end) {
            justified_ub.start = date + ' ' + ub_45_sat.start;
            justified_ub.end = date + ' ' + ub_45_sat.end;
        }

        if(start < ub_45_sat.start && end < ub_45_sat.end) {
            justified_ub.start = date + ' ' + ub_45_sat.start;
            justified_ub.end = date + ' ' + end;
        }

        if(start > ub_45_sat.start && end > ub_45_sat.end) {
            justified_ub.start = date + ' ' + start;
            justified_ub.end = date + ' ' + ub_45_sat.end;
        }

        if(start > ub_45_sat.start && end < ub_45_sat.end) {
            justified_ub.start = date + ' ' + start;
            justified_ub.end = date + ' ' + end;
        }
        if(start > ub_45_sat.start) {
            if(end <= ub_45_sat.end) {
                justified_ub.start = date + ' ' + start;
                justified_ub.end = date + ' ' + end;
            }
        }
    }

    console.log(justified_ub);

    justified_ub.hours = Math.round(moment
        .duration(moment(justified_ub.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(justified_ub.start, 'YYYY/MM/DD HH:mm'))).asHours() * 100) / 100;

    justified_ub.minutes = moment
        .duration(moment(justified_ub.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(justified_ub.start, 'YYYY/MM/DD HH:mm'))).asMinutes();

    if(Math.sign(justified_ub.hours) === -1) {
        justified_ub.start = '';
        justified_ub.end = '';
        justified_ub.hours = '';
        justified_ub.minutes = '';
    }

    return justified_ub;
}

function calculateUB90(start, end, date, day) {
    var ub_90 = ubAddOnObjects.ub_90;

    var justified_ub = {
        start: '',
        end: '',
        hours: '',
        minutes: '',
    }

    if(ub_90.days.includes(day)) {
        if(start <= ub_90.start && this.end.match(/\d\d:\d\d/)[0] >= ub_90.end) {
            justified_ub.start = date + ' ' + ub_90.start;
            justified_ub.end = end;
        }

        if(start > ub_90.start && this.end.match(/\d\d:\d\d/)[0] > ub_90.end) {
            justified_ub.start = date + ' ' + start;
            justified_ub.end = end;
        }
    }

    justified_ub.hours = Math.round(moment
        .duration(moment(justified_ub.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(justified_ub.start, 'YYYY/MM/DD HH:mm'))).asHours() * 100) / 100;

    justified_ub.minutes = moment
        .duration(moment(justified_ub.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(justified_ub.start, 'YYYY/MM/DD HH:mm'))).asMinutes();

    if(Math.sign(justified_ub.hours) === -1) {
        justified_ub.start = '';
        justified_ub.end = '';
        justified_ub.hours = '';
    }

    return justified_ub;
}

function calculateUB96(start, end, day) {
    var ub_96 = ubAddOnObjects.ub_96;

    var justified_ub = {
        start: '',
        end: '',
        hours: '',
        minutes: '',
    }


    if(ub_96.days.includes(day)) {
        justified_ub.start = start;
        justified_ub.end = end;
    }

    justified_ub.hours = Math.round(moment
        .duration(moment(justified_ub.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(justified_ub.start, 'YYYY/MM/DD HH:mm'))).asHours() * 100) / 100;

    justified_ub.minutes = moment
        .duration(moment(justified_ub.end, 'YYYY/MM/DD HH:mm')
            .diff(moment(justified_ub.start, 'YYYY/MM/DD HH:mm'))).asMinutes();

    return justified_ub;
}

function calculatePay() {
    var wage = document.getElementById('salary-input').value;
    var wageInMinutes = (wage / 60);
    var totalTag = document.getElementById('total-pay');
    var totalNoUb = document.getElementById('total-pay-no-ub');
    var totalUb = document.getElementById('total-ub-no-regular');
    var sum = 0;
    var ubSum = 0;
    for(var index in eventListObjects) {
        var event = eventListObjects[index];
        sum = sum + (wageInMinutes * event.minutes);
        if(event.ub_22.start !== "") {
            ubSum = ubSum + (ubAddOnObjects.ub_22.add_on_min * event.ub_22.minutes);
        }
        if(event.ub_45.start !== "") {
            ubSum = ubSum + (ubAddOnObjects.ub_45.add_on_min * event.ub_45.minutes);
        }
        if(event.ub_45_saturday.start !== "") {
            ubSum = ubSum + (ubAddOnObjects.ub_45_sat.add_on_min * event.ub_45_saturday.minutes);
        }
        if(event.ub_90.start !== "") {
            ubSum = ubSum + (ubAddOnObjects.ub_90.add_on_min * event.ub_90.minutes);
        }
        if(event.ub_96.start !== "") {
            ubSum = ubSum + (ubAddOnObjects.ub_96.add_on_min * event.ub_96.minutes);
        }
    }

    totalTag.innerText = Math.round(sum + ubSum) + ',-';
    totalNoUb.innerText = Math.round(sum) + ',-';
    totalUb.innerText = Math.round(ubSum) + ',-';
}
"use strict";

var DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var START_DAY = 1;

var hash = location.hash.slice(2);
var datetime = new Date(hash || Date.now());
// 月名のラベル
var month = datetime.getMonth() + 1;
// 月の開始日を算出
var startDay = function (datetime) {
  var d = new Date(datetime);
  d.setDate(1);
  return d.getDay();
}(datetime);
// 月内の日数を算出
var days = function (datetime) {
  var d = new Date(datetime);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  return d.getDate();
}(datetime);
// 月内の週数を算出
var weeks = Math.ceil((startDay + days) / 7);

window.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector("h1.month").textContent = month;
  var blank = document.createElement("tr");
  var table = document.querySelector("table");
  var dayName = table.querySelector(".header");
  for (var d = START_DAY; d < START_DAY + 7; d++) {
    var name = document.createElement("th");
    name.textContent = DAY_LABELS[d % 7];
    dayName.appendChild(name);
  }
  dayName.appendChild(blank.cloneNode());
  var count = 0;
  for (var w = 0; w < weeks; w++) {
    var tr = document.createElement("tr");
    for (var _d = START_DAY; _d < START_DAY + 7; _d++) {
      var td = document.createElement("td");
      tr.appendChild(td);
      if (_d + w * 7 < startDay || ++count > days) {
        continue;
      }
      td.textContent = count;
    }
    tr.appendChild(blank.cloneNode());
    table.appendChild(tr);
  }
});

window.addEventListener("hashchange", function (event) {
  location.reload();
});
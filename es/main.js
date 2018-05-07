const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const START_DAY = 1;

const hash = location.hash.slice(2);
const datetime = new Date(hash || Date.now());
// 月名のラベル
const month = datetime.getMonth() + 1;
// 月の開始日を算出
const startDay = ((datetime) => {
  const d = new Date(datetime);
  d.setDate(1);
  return d.getDay();
})(datetime);
// 月内の日数を算出
const days = ((datetime) => {
  const d = new Date(datetime);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  return d.getDate();
})(datetime);
// 月内の週数を算出
const weeks = Math.ceil((startDay + days) / 7);

window.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector("h1.month").textContent = month;
  let blank = document.createElement("tr");
  const table = document.querySelector("table");
  const dayName = table.querySelector(".header");
  for (let d = START_DAY; d < START_DAY + 7; d++) {
    const name = document.createElement("th");
    name.textContent = DAY_LABELS[d % 7];
    dayName.appendChild(name);
  }
  dayName.appendChild(blank.cloneNode());
  let count = 0;
  for (let w = 0; w < weeks; w++) {
    const tr = document.createElement("tr");
    for (let d = START_DAY; d < START_DAY + 7; d++) {
      const td = document.createElement("td");
      tr.appendChild(td);
      if (d + w * 7 < startDay || ++count > days) {
        continue;
      }
      td.textContent = count;
    }
    tr.appendChild(blank.cloneNode());
    table.appendChild(tr);
  }
});

window.addEventListener("hashchange", (event) => {
  location.reload();
});

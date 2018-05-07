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
  document.title = datetime.getFullYear() + "/" + ("00" + month).slice(-2);
  document.querySelector("h1.month").textContent = month;
  const tbody = document.querySelector("tbody");
  const thead = document.querySelector("thead");
  for (let d = START_DAY; d < START_DAY + 7; d++) {
    const name = document.createElement("th");
    name.textContent = DAY_LABELS[d % 7];
    thead.appendChild(name);
  }
  thead.appendChild(document.createElement("th"));
  let count = 0;
  for (let w = 0; w < weeks; w++) {
    const tr = document.createElement("tr");
    for (let d = START_DAY; d < START_DAY + 7; d++) {
      const td = document.createElement("td");
      td.classList.toggle(DAY_LABELS[d % 7].toLowerCase());
      tr.appendChild(td);
      if (d + w * 7 < startDay || ++count > days) {
        continue;
      }
      // td.textContent = count;
      // ----
      // SVG方式
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const text = document.createElementNS(svg.namespaceURI, "text");
      text.setAttribute("dx", 12);
      text.setAttribute("dy", 4);
      text.textContent = count;
      svg.append(text);
      td.append(svg);
    }
    tr.appendChild(document.createElement("td"));
    tbody.appendChild(tr);
  }
});

window.addEventListener("hashchange", (event) => {
  location.reload();
});

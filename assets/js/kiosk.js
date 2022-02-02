async function fetchKioskAPI() {
  try {
    let response = await fetch("api_live_meetings.json");
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

const polishMonths = {
  "01": "stycznia",
  "02": "lutego",
  "03": "marca",
  "04": "kwietnia",
  "05": "maja",
  "06": "czerwca",
  "07": "lipca",
  "08": "sierpnia",
  "09": "września",
  "10": "października",
  "11": "listopada",
  "12": "grudnia",
};

function parseDate(dateAndTime) {
  let [date, time] = dateAndTime.split(" ");
  let [day, month, year] = date.split("-");
  let [hours, minutes] = time.split(":");

  return {
    time: {
      hours: hours,
      minutes: minutes,
    },
    date: {
      day: day,
      month: month,
      year: year,
    },
  };
}

const kioskDateNode = document.getElementById("kiosk-date");

async function main() {
  let kioskData = await fetchKioskAPI();
  let parsedDate = parseDate(kioskData.date);

  kioskDateNode.innerText = `wtorek, ${parsedDate.date.day} ${
    polishMonths[parsedDate.date.month]
  } o godzine ${parsedDate.time.hours}:${parsedDate.time.minutes}`;
}

main()
window.setInterval(main, 6000)

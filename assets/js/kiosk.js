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

const polish = {
  days: [
    "niedziela",
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota",
  ],
  months: [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia",
  ],
};

function parseDate(dateAndTime) {
  let [date, time] = dateAndTime.split(" ");
  let [day, month, year] = date.split("-");

  return new Date(`${month}-${day}-${year} ${time}`);
}

const kioskDateNode = document.getElementById("kiosk-date");

async function main() {
  let kioskData = await fetchKioskAPI();
  let parsedDate = parseDate(kioskData.date);

  kioskDateNode.innerText = `${
    polish.days[parsedDate.getDay()]
  }, ${parsedDate.getDate()} ${
    polish.months[parsedDate.getMonth()]
  } o godzine ${parsedDate.getHours()}:${parsedDate.getMinutes()}`;
}

main();
window.setInterval(main, 6000);

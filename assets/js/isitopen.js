const atUrl = "//at.hs-ldz.pl/api/v1/users?online=true";
const isItOpenElementBigMessage = document.getElementById("isitopen_bigmessage");
const isItOpenElementNormalText = document.getElementById("isitopen_normaltext");

/*
 * isItOpen pulls online users from our at system and
 * if there are more hackers than 0, display message
 * about space being open on the website.
 */
async function isItOpen() {
  try {
    let res = await fetch("//at.hs-ldz.pl/api/v1/users?online=true", {});
    if (!res.ok) {
      return;
    }
    let json = await res.json();
    if (json.length == 0) {
      return;
    }
    isItOpenElementBigMessage.style.display = "block";
    isItOpenElementNormalText.style.display = "block";
  } catch (error) {
    return;
  }
}

/* run isItOpen as async function */
isItOpen();

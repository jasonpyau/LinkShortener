var shortenedLink = "";
let convertButton = document.getElementById("ConvertButton");
let copyLinkButton = document.getElementById("CopyLink");
let linkToConvertBox = document.getElementById("LinkToConvert");
let customizeURLBox = document.getElementById("CustomizeURL");
let tinyURLLabel = document.getElementById("TinyURL")
let tinyURL = document.getElementById("TinyURLLink");

convertButton.onclick = function() {
  newTinyURL();
}
copyLinkButton.onclick = function() {
  let link = tinyURL.textContent;
  if(link != "Link" && link != "Error") {
    navigator.clipboard.writeText(link);
  }
}
const apiURL = "https://api.tinyurl.com/", a = "mXY9x9Ri46AAehcQnid7wFnto0dNqTnbefdC9Nypb4VT44IKmAGAyuBTXrtW";
const headers = {
  Accept: "application/json",
  Authorization: "Bearer "+a,
  "Content-Type": "application/json/"
};

let body = {
  url: "https://github.com/jasonpyau/",
  domain: "tinyurl.com",
  alias: ""
};


async function newTinyURL() {
  updateData();
  
  $.ajax({
    url: apiURL+"create",
    type: "POST",
    data: JSON.stringify(body),
    headers: headers,
    success: function (response) {
      setTinyURL(response.data.tiny_url);
    },
    error: function() {
      setTinyURL("Error");
    }
  })
};

function updateData() {
  body.url = linkToConvertBox.value;
  body.alias = customizeURLBox.value;
};

function setTinyURL(TinyURL) {
  shortenedLink = TinyURL;
  tinyURL.textContent = shortenedLink;
  if(shortenedLink != "Error") {
    tinyURL.href = shortenedLink;
    tinyURLLabel.style.background = "#a5ffa1";
  }
  else {
    tinyURL.removeAttribute("href");
    tinyURLLabel.style.background = "#ff7878";
  }
};

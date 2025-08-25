var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var rowData = document.getElementById("rowData");
if (localStorage.getItem("site") !== null) {
  siteList = JSON.parse(localStorage.getItem("site"));
  displaySite(siteList);
} else {
  siteList = [];
}
function addSite() {
  var site = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  siteList.push(site);
  console.log(siteList);
  localStorage.setItem("site", JSON.stringify(siteList));
  clear();
  displaySite(siteList);
}
function clear() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}
function displaySite(arr) {
  var container = "";
  for (var i = 0; i < arr.length; i++) {
    container += `
    <div class="content d-flex justify-content-between align-items-center p-3">
        <div class="repeat d-flex justify-content-center">
          <p>${i}</p>
        </div>
        <div class="repeat d-flex justify-content-center">
          <p>${arr[i].name}</p>
        </div>
        <div class="repeat d-flex justify-content-center">
          <button class="btn btn-warning"><a href="${arr[i].url}">Visit</a></button>
        </div>
        <div class="repeat d-flex justify-content-center">
          <button class="btn btn-danger" onclick="deleteSite(${i})">Delete</button>
        </div>
      </div>
    `;
  }
  rowData.innerHTML = container;
}
function deleteSite(index) {
  siteList.splice(index, 1);
  console.log(siteList);
  localStorage.setItem("site", JSON.stringify(siteList));
  displaySite(siteList)
}

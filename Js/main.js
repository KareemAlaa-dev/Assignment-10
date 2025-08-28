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
      <tr>
        <td data-cell="Index">${i}</td>
        <td data-cell="WebsiteName">${arr[i].name}</td>
        <td data-cell="Visit">
          <button class="btn btn-warning">
            <a href="https://${arr[i].url}">Visit</a>
          </button>
        </td>
        <td data-cell="Delete">
          <button class="btn btn-danger" onclick="deleteSite(${i})">delete</button>
        </td>
      </tr>
    `;
  }
  rowData.innerHTML = container;
}
function deleteSite(index) {
  siteList.splice(index, 1);
  console.log(siteList);
  localStorage.setItem("site", JSON.stringify(siteList));
  displaySite(siteList);
}

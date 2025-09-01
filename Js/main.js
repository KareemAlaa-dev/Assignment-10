var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var nameAlert = document.getElementById("nameAlert");
var urlAlert = document.getElementById("urlAlert");
var rowData = document.getElementById("rowData");
var siteList = [];
if (localStorage.getItem("site") !== null) {
  siteList = JSON.parse(localStorage.getItem("site"));
  displaySite(siteList);
}
function addSite() {
  if (validateName() & validateUrl()) {
    var site = {
      name: siteNameInput.value.trim(),
      url: siteUrlInput.value.trim(),
    };
    siteList.push(site);
    localStorage.setItem("site", JSON.stringify(siteList));
    clear();
    displaySite(siteList);
  }
}
function clear() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteUrlInput.classList.remove("is-valid", "is-invalid");
  nameAlert.classList.add("d-none");
  urlAlert.classList.add("d-none");
}
function displaySite(arr) {
  var container = "";
  for (var i = 0; i < arr.length; i++) {
    container += `
      <tr>
        <td data-cell="Index">${i + 1}</td>
        <td data-cell="WebsiteName">${arr[i].name}</td>
        <td data-cell="Visit">
          <a class="btn btn-warning" target="_blank" href="https://${
            arr[i].url
          }">Visit</a>
        </td>
        <td data-cell="Delete" class="last-cell">
          <button class="btn btn-danger" onclick="deleteSite(${i})">Delete</button>
        </td>
      </tr>
    `;
  }
  rowData.innerHTML = container;
}
function deleteSite(index) {
  siteList.splice(index, 1);
  localStorage.setItem("site", JSON.stringify(siteList));
  displaySite(siteList);
}
function validateName() {
  var regex = /^.{3,}$/;
  if (regex.test(siteNameInput.value.trim())) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
    return false;
  }
}
function validateUrl() {
  var regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;
  if (regex.test(siteUrlInput.value.trim())) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    urlAlert.classList.add("d-none");
    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    urlAlert.classList.remove("d-none");
    return false;
  }
}
siteNameInput.addEventListener("input", validateName);
siteUrlInput.addEventListener("input", validateUrl);

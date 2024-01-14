var websiteName = document.getElementById("website-name");
var websiteUrl = document.getElementById("website-url");
var submit = document.getElementById("submit");
var tableBody = document.getElementById("table-body");
var fixedBox = document.getElementById("fixed-box");
var closeBox = document.getElementById("close-box");

var websitesList = [];
console.log(websitesList);

if (localStorage.getItem("websites") !== null) {
  websitesList = JSON.parse(localStorage.getItem("websites"));
  display();
}


    submit.addEventListener("click", function () {
        if(isValidUrl()&&isValidName()){
            var websites = {
                name: websiteName.value,
                url: websiteUrl.value,
              };
              websitesList.push(websites);
              localStorage.setItem("websites", JSON.stringify(websitesList));
              display();
              clearForm();
              websiteName.classList.remove("valid","invalid");
              websiteUrl.classList.remove("valid","invalid");
            }else {
                fixedBox.classList.replace("d-none","d-flex")
            }
            ;
        })


        closeBox.addEventListener("click",function(){
            fixedBox.classList.replace("d-flex","d-none")
            
        })
        
websiteName.addEventListener("keyup",function(){
    if(isValidName()){
        websiteName.classList.add("valid");

    }else {
        websiteName.classList.add("invalid")
    }
}) 
websiteUrl.addEventListener("keyup",function(){
    if(isValidUrl()){
        websiteUrl.classList.add("valid");

    }else {
        websiteUrl.classList.add("invalid")
    }
})




function isValidName() {
  var reg = /^[A-Za-z]{3,}/;

  var validateName = websiteName.value;
  if (reg.test(validateName) === true) {
    return true;
  } else {
    return false;
  }
}

function isValidUrl() {
  var reg = /^(https?:\/\/)?(www.)?\w+\.\w+$/;
  var url = websiteUrl.value;
  if (reg.test(url)) {
    return true;
  } else {
    return false;
  }
}

function display() {
  rows = "";
  for (let i = 0; i < websitesList.length; i++) {
    rows += `
        <tr>
        <td>${i + 1}</td>
        <td>${websitesList[i].name}</td>
       
        <td><button id="visit" class="btn"><i class="fa-solid fa-eye text-light pe-2"></i><a target="_blank" href="${websitesList[i].url}">Visit</a></button></td>
        <td><button onclick="deleteItem(${i})" id="delete" class="btn"><i class="fa-solid fa-trash text-light pe-2"></i>Delete</button></td>
    </tr>
        
        
        
        `;
  }
  tableBody.innerHTML = rows;
}
function clearForm() {
  websiteName.value = "";
  websiteUrl.value = "";
}

function deleteItem(index) {
  websitesList.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(websitesList));
  display();
  console.log(tableBody);
}

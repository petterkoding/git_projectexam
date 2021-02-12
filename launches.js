const pastUrl = "https://api.spacexdata.com/v4/launches/past/";

const launchResults = document.querySelector(".launch-results");
const launchCount = document.querySelector("#launch-count");
const loadmore = document.querySelector("#loadmore");
let rockets = [];
const searchMsg = document.querySelector(".search-message");
const searchBar = document.querySelector("#searchbar");
const prePopulatedList = document.querySelector(".suggestions");

searchMsg.innerHTML = "";

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.trim().toLowerCase();
  const filteredRockets = rockets.filter(rocket => {
    return rocket.name.toLowerCase().startsWith(searchString);
  });


  prePopulatedList.innerHTML = "";
  for (let i = 0; i < filteredRockets.length; i++){
    let li = document.createElement("li");
    li.innerHTML += `<a class="txt-link" href="details.html?id=${filteredRockets[i].id}">${filteredRockets[i].name}</a>`;
    li.classList.add("list-item");
    prePopulatedList.appendChild(li);
    
  }
  if (searchString === "" || searchString === null) {
    prePopulatedList.innerHTML = "";
  } 
});

async function getPastLaunches() {
  try {
    const response = await fetch(pastUrl);
    rockets = await response.json();
    // reverse sort array latest to oldest
    rockets.reverse(); 

    launchResults.innerHTML = "";
    launchCount.innerHTML = "";
    
    createHTML(rockets);   
  } catch (error) {
    console.log(error);
    launchResults.innerHTML = displayError("Error has occured");
  } finally {
    console.log("finally");
  }
}
getPastLaunches();



// nightmode toggle
const nightMode = document.querySelector(".nightmode");
const switchContainer = document.querySelector(".nightmodeContainer");
nightMode.onclick = function () {
    let bodyElement = document.body;
  bodyElement.classList.toggle("darkmode");
  nightMode.classList.toggle("switchOn")
  
}



function createHTML(rockets) {
  for (let i = 0; i < rockets.length; i++){

    let cardImg = rockets[i].links.flickr.original[0];

    let count = i + 1;

    let localDate = rockets[i].date_local;
    // convert iso date to month date year
    let dateOfLaunch = new Date(localDate),
      year = dateOfLaunch.getFullYear(),
      month = dateOfLaunch.getMonth() + 1,
      date = dateOfLaunch.getDate();
    let convertedDate = date + "/" + month + "/" + year;

    launchResults.innerHTML += `<a class="launch-cards" href="details.html?id=${rockets[i].id}">
                <img class="card-img" src="${cardImg}" onerror="this.src='images/falcon.jpg'"/>
                <h4><span class="item-count">#${count}</span> ${rockets[i].name}</h4>
                <p>Launch date: ${convertedDate}</p></a>`;
    }

    // count for each rocket
    let currentItems = 8;

    launchCount.innerHTML = `Currently showing <span>${currentItems} of ${rockets.length}</span> rocket launches`;

    loadmore.addEventListener("click", (e) => {
      const items = document.querySelectorAll(".launch-cards");

      for (let i = currentItems; i < currentItems + 8; i++) {
        if (items[i]) {
          items[i].style.display = "block";
        }
      }
      currentItems += 8;

      // counting displaying rockets
      launchCount.innerHTML = `Currently showing <span>${currentItems} of ${rockets.length}</span> rocket launches`;
      if (currentItems >= items.length) {
        loadmore.style.display = "none";
        let difference = currentItems - rockets.length;
        launchCount.innerHTML = `Currently showing <span>
        ${currentItems - difference}
        </span> of ${rockets.length} rocket launches`;
      }
    });
}
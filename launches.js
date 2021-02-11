const pastUrl = "https://api.spacexdata.com/v4/launches/past/";

const launchResults = document.querySelector(".launch-results");
const launchCount = document.querySelector("#launch-count");
const loadmore = document.querySelector("#loadmore");



async function getPastLaunches() {
  try {
    const response = await fetch(pastUrl);
    const rockets = await response.json();
    console.log(rockets);
    // reverse sort array latest to oldest
    rockets.reverse(); 

    launchResults.innerHTML = "";
    launchCount.innerHTML = "";

    // search for rocket, name must be the same to be able to find
    const searchBtn = document.querySelector("#search-btn");
    const searchMsg = document.querySelector(".search-message");
    searchMsg.innerHTML = "Search e.g. Starlink-1, Turksat 5A, CRS-8";
    const search = document.querySelector("#search");
   
    searchBtn.onclick = function () {
      
      for (let i = 0; i < rockets.length; i++) {
        // check if the input.value matches a rocket name, find index and use index to get id
        if (rockets[i].name.toLowerCase() === search.value.toLowerCase()) {
          console.log("Rocket found at index " + i);
          searchMsg.innerHTML = `Did you mean <a class="txt-link" href="details.html?id=${rockets[i].id}">${rockets[i].name} <i class="fas fa-link"></i></a>` 
        }

      };
    } 

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
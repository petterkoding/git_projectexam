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

    //
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

    launchCount.innerHTML = `Currently showing ${currentItems} of ${rockets.length} rocket launches`;

    loadmore.addEventListener("click", (e) => {
      const items = document.querySelectorAll(".launch-cards");

      for (let i = currentItems; i < currentItems + 8; i++) {
        if (items[i]) {
          items[i].style.display = "block";
        }
      }
      currentItems += 8;

      // counting displaying rockets
      launchCount.innerHTML = `Currently showing ${currentItems} of ${rockets.length} rocket launches`;
      if (currentItems >= items.length) {
        loadmore.style.display = "none";
        let difference = currentItems - rockets.length;
        launchCount.innerHTML = `Currently showing ${
          currentItems - difference
        } of ${rockets.length} rocket launches`;
      }
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("past launches loaded successfully");
  }
}
getPastLaunches();




// const search = document.querySelector("#search");
//         const searchBtn = document.querySelector("#search-btn");
//         const searchMsg = document.querySelector(".search-message");
        
//         searchBtn.onclick = function () {
//           const searchCriteria = search.value;
        
//           const foundAMatch = isSame(searchCriteria);
        
        
//           if (foundAMatch === true) {
//             document.location.href = `details.html?id=${rockets.id}`;
//           } else {
//             searchMsg.innerHTML = `LOL`
//           }
//         }
        
//         function isSame(rocketToCheck) {
//           if (rocketToCheck === rockets.name) {
//             return true;
//           }
//           return false;
//         }




// const array = [{ name: "joe" }, { name: "biden" }, { name: "sara" }];



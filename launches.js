const url = "https://api.spacexdata.com/v4/launches/past/";

const launchResults = document.querySelector(".launch-results");
const launchCount = document.querySelector("#launch-count");
const loadmore = document.querySelector("#loadmore")

launchResults.innerHTML = "";

async function getPastLaunches() {
    try {
        const response = await fetch(url);
        const rockets = await response.json();
        console.log(rockets);
        // reverse sort array latest to oldest
        rockets.reverse();

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

            launchResults.innerHTML += `<div href="#" class="launch-cards">
                <img class="card-img" src="${cardImg}" onerror="this.src='images/falcon.jpg'"/>
                <h4><span class="item-count">#${count}</span> ${rockets[i].name}</h4>
                <p>Launch date: ${convertedDate}</p>
                <a href="details.html?id=${rockets[i].id}"">View more</a>
                </div>`;
        }

        // count for each rocket
        let currentItems = 8;

        loadmore.addEventListener("click", (e) => {
            const items = document.querySelectorAll(".launch-cards")

            for (let i = currentItems; i < currentItems + 8; i++) {
                if (items[i]) {
                    items[i].style.display = "block";
                }
            }
            currentItems += 8;

            if (currentItems >= items.length) {
                loadmore.style.display = "none";
            }
        });
    
 } catch (error) {
    console.log(error);
  } finally {
    console.log("finally");
  }
}
getPastLaunches();

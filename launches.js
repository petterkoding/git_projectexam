const url = "https://api.spacexdata.com/v4/launches/past/";

const launchResults = document.querySelector(".launch-results")

const selector = document.querySelector("#select");

async function getPastLaunches() {
    try {
        const response = await fetch(url);
        const rockets = await response.json();
        console.log(rockets)
        // reverse sort array latest to oldest
        rockets.reverse();
        function createHTML(rockets) {
            launchResults.innerHTML = "";

            for (let i = 0; i < rockets.length; i++) {
                let cardImg = rockets[i].links.flickr.original[0];
        
                launchResults.innerHTML +=
                        `<div href="#" class="launch-cards">
                        <img class="card-img" src="${cardImg}" onerror="this.src='images/falcon.jpg'"/>
                        <h4>Name: ${rockets[i].name}</h4>
                        <p>Launch date:${rockets[i].date_local}</p>
                        <a href="details.html?id=${rockets[i].id}"">View more</a>
                        </div>`;
            }  
        } createHTML(rockets);

        // sort products by options on select
        // const selector = document.querySelector("#select");
        
        // selector.onchange = function sortingOption() {

        //     // sort by price low to high
        //     if (selector.value === "first") {
              
                
        //         rockets.reverse();
                
        //     }
        // }
    } catch (error) {
        console.log(error)
    } finally {
        console.log("finally")
    }
}
getPastLaunches();

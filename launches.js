const url = "https://api.spacexdata.com/v4/launches/past/";

const launchResults = document.querySelector(".launch-results")

launchResults.innerHTML = "";

async function getPastLaunches() {
    try {
        const response = await fetch(url);
        const results = await response.json();
        console.log(results)
        // reverse array to latest to oldest
        results.reverse();

        
        let page1 = results.slice(0, 20);

            for (let i = 0; i < page1.length; i++) {

                let cardImg = results[i].links.flickr.original[0];

                launchResults.innerHTML +=
                    `<div href="#" class="launch-cards">
                        <img class="card-img" src="${cardImg}" onerror="this.src='images/falcon.jpg';"/>
                        <h4>Name: ${results[i].name}</h4>
                        <p>Launch date:${results[i].date_local}</p>
                    </div>`;
        }

        const buttonTwo = document.querySelector("#secondPage")

        buttonTwo.onclick = function nextPage() {
            launchResults.style.display = "none"; 
            
            const results2 = document.querySelector(".results2")

            for (let i = 0; i < page2.length; i++) {

                let cardImg = results[i].links.flickr.original[0];

                results2.innerHTML +=
                    `<div href="#" class="launch-cards">
                        <img class="card-img" src="${cardImg}" onerror="this.src='images/falcon.jpg';"/>
                        <h4>Name: ${results[i].name}</h4>
                        <p>Launch date:${results[i].date_local}</p>
                    </div>`;
            }
        }
       
    } catch (error) {
        console.log(error)
    } finally {
        console.log("finally")
    }
 
}

getPastLaunches();




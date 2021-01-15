const url = "http://api.open-notify.org/astros.json";

const pplContainer = document.querySelector(".peopleInSpace")

const peopleInSpace = document.querySelector(".currentPeopleInSpace")



async function getPeopleInSpace() {
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.people)
        const people = json.people;

        pplContainer.innerHTML = "";
        peopleInSpace.innerHTML = "";
        
        for (let i = 0; i < people.length; i++){
            pplContainer.classList.add("people");
            pplContainer.innerHTML += `<div class="people">
                                        <h4>${people[i].name}</h4>
                                    </div>`;
            peopleInSpace.innerHTML = `<span>There are currently ${people.length} people in space</span>`;
        }
    } catch (error) {
        console.log(error)
        pplContainer.innerHTML = `an error has occured`;
        
    }
}

getPeopleInSpace();

const pastLaunch = "https://api.spacexdata.com/v4/launches/latest";

const latestDetails = document.querySelector(".latest-details")

latestDetails.innerHTML = "";


async function getLatestLaunch(){
    try{
        const response = await fetch(pastLaunch);
        const result = await response.json();
        console.log(result)
        latestDetails.classList.add("turksat")
        latestDetails.innerHTML = `<div class="turksat">
                                        <h3>Latest</h3>
                                        <h2 class="rocketName">${result.name}</h2>
                                        <span class="launch-date">${result.date_local}</span>
                                        <div class="para">
                                            <p class="details">${result.details}</p>
                                        </div>
                                        <a class="button dark" href="https://spacenews.com/spacex-launches-turksat-5a/" target="_blank">Read more</a>                    
                                        <a class="button dark" href="https://youtu.be/9I0UYXVqIn8" target="_blank">Watch stream</a>                    
                                    </div>`;

    } catch (e) {
        console.log(e)
    } finally {
        console.log("finally")
    }
}

getLatestLaunch();

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

const latestLaunch = "https://api.spacexdata.com/v4/launches/latest";

const latestDetails = document.querySelector(".latest-details")

latestDetails.innerHTML = "";


async function getLatestLaunch(){
    try{
        const response = await fetch(latestLaunch);
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


// get past launches SpaceX

const pastLaunches = "https://api.spacexdata.com/v4/launches/past";

const timelineContainer = document.querySelector(".timelineContainer")

async function getPastLaunches() {
    try {
        const response = await fetch(pastLaunches);
        const result = await response.json();
        
        timelineContainer.innerHTML = "";

        result.reverse();
        console.log(result)
        for (let i = 0; i < result.length; i++) {
            
            if (result.length = 5) {
                timelineContainer.classList.add(".recentLaunchTarget");
                timelineContainer.innerHTML += `<div class="recentLaunchTarget">
                                                    <h3>${result[i].name}</h3>
                                                    <p>${result[i].date_local}</p>
                                                </div>`;
                
                const recLaunchDiv = document.querySelectorAll(".recentLaunchTarget")
                // console.log(result[i].links.flickr.original[0]);

                for (let i = 0; i < recLaunchDiv.length; i++) {
                    let imageURL = result[i].links.flickr.original[0];
                    recLaunchDiv[i].style.backgroundImage = `url(${imageURL})`;
                }
            }
            
        }
    } catch (error) {
        console.log(error)
    }
}

getPastLaunches();



const issLocation = "http://api.open-notify.org/iss-now.json";

const issContainer = document.querySelector(".issLocation")

async function getIssLocation() {
    try {
        const response = await fetch(issLocation)
        const location = await response.json()
        console.log(location)
        const latitude = location.iss_position.latitude;
        const longitude = location.iss_position.longitude;

        issContainer.innerHTML = `Latitude: ${latitude} Longitude: ${longitude} <iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed" width="960" height="570" frameborder="0" style="border:0"></iframe>`;

    } catch (error) {
        console.log(error)
    } finally {
        console.log("location found")
    }
}

getIssLocation();




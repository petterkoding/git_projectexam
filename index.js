const url = "http://api.open-notify.org/astros.json";

const pplContainer = document.querySelector(".peopleInSpace")

const peopleInSpace = document.querySelector(".currentPeopleInSpace")


// fetch people in space
async function getPeopleInSpace() {
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.people)
        const people = json.people;

        pplContainer.innerHTML = "";
        peopleInSpace.innerHTML = "";
        
        for (let i = 0; i < people.length; i++){
            // listing the names
            pplContainer.classList.add("people");
            pplContainer.innerHTML += `<div class="people">
                                            <h4>${people[i].name}</h4>
                                        </div>`;
            // listing how many in space
            peopleInSpace.innerHTML = `<span>There are currently ${people.length} people in space</span>`;
        }
    } catch (error) {
        console.log(error)
        pplContainer.innerHTML = `an error has occured`;
        
    }
}

getPeopleInSpace();


// fetch latest launch information
const latestLaunch = "https://api.spacexdata.com/v4/launches/latest";

const latestDetails = document.querySelector(".latest-details")
const latestImg = document.querySelector(".latest-img")

latestDetails.innerHTML = "";


async function getLatestLaunch(){
    try{
        const response = await fetch(latestLaunch);
        const result = await response.json();
        console.log(result)
        latestDetails.classList.add("latest-info")
        latestImg.innerHTML = `<img class="two-col-img" src="${result.links.flickr.original[0]}" alt="Image of ${result.name}">`;
        latestDetails.innerHTML = `<div class="two-col-info">
                                        <h3>Latest</h3>
                                        <h2 class="rocketName">${result.name}</h2>
                                        <span class="launch-date">${result.date_local}</span>
                                        <div class="para">
                                            <p class="details">${result.details}</p>
                                        </div>
                                        <a class="button dark" href="${result.links.article}" target="_blank">Read more</a>                    
                                        <a class="button dark" href="${result.links.webcast}" target="_blank">Watch stream</a>                    
                                    </div>`;

    } catch (e) {
        console.log(e)
    } finally {
        console.log("finally")
    }
}

getLatestLaunch();


// fetch upcoming launch information
const upcomingLaunch = "https://api.spacexdata.com/v4/launches/upcoming/";

const upcomingContainer = document.querySelector(".upcomingContainer")
const upcomingImg = document.querySelector(".upcomingImgContainer")

upcomingContainer.innerHTML = "";
upcomingImg.innerHTML = "";


async function getUpcomingLaunch(){
    try{
        const response = await fetch(upcomingLaunch);
        const result = await response.json();
        console.log(result)
        upcomingImg.innerHTML = `<img src="${result[0].links.patch.small}" alt="patch emblem of ${result[0].name}" onerror="this.src='images/rocket.jpg'"/>`
        upcomingContainer.innerHTML = `<div>
                                            <h2 class="rocketName">${result[0].name}</h2>
                                            <span class="launch-date">${result[0].date_local}</span>
                                            <div class="para">
                                                <p class="details">${result[0].details}</p>
                                            </div>                  
                                        </div>`;

    } catch (e) {
        console.log(e)
    } finally {
        console.log("finally")
    }
}

getUpcomingLaunch();


// get past 5 launches SpaceX

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
            
            if (result.length = 4) {
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




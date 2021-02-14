// fetch latest launch information
const latestLaunch = "https://api.spacexdata.com/v4/launches/latest";

const latestDetails = document.querySelector(".latest-details")
const latestImg = document.querySelector(".latest-img")




async function getLatestLaunch(){
    try{
        const response = await fetch(latestLaunch);
        const result = await response.json();
        // console.log(result)

        latestDetails.innerHTML = "";

        let readMoreLink = "";
        let wikipediaLink = `<a class="button dark" href="https://en.wikipedia.org/wiki/SpaceX" target="_blank">Read more</a>`;
        let articleLink = `<a class="button dark" href="${result.links.article}" target="_blank">Read more</a>`;
        if (!result.links.article) {
          // if theres no article, use wikipedia as url
          readMoreLink = wikipediaLink;
        } else {
          readMoreLink = articleLink;
        }
        // video
        let watch = "";
        let youtubeLink = `<a class="button dark" href="https://www.youtube.com/c/SpaceX/videos" target="_blank">Watch</a>`;
        let webcastLink = `<a class="button dark" href="${result.links.webcast}" target="_blank">Watch</a>`;
        if (!result.links.webcast) {
          // if theres no webcast, use youtube as url
          watch = youtubeLink;
        } else {
          watch = webcastLink;
        }

        latestImg.innerHTML = `<img class="two-col-img" src="${result.links.flickr.original[0]}" alt="Image of ${result.name}" onerror="this.src='images/rocket.jpg'">`;
        latestDetails.innerHTML = `<div class="two-col-info">
                                        <h3 class="mobile-margin orange-border">Latest</h3>
                                        <h2 class="rocketName mobile-margin">${result.name}</h2>
                                        <time class="launch-date mobile-margin">${result.date_local}</time>
                                        <div class="para para-margin">
                                            <p class="details">${result.details}</p>
                                            ${readMoreLink}                    
                                            ${watch}  
                                        </div>
                                                         
                                    </div>`;

    } catch (e) {
        console.log(e)
        latestDetails = displayError("Error has occured");
        latestImg.innerHTML = displayError("Error has occured");
    } finally {
        console.log("finally")
    }
}

getLatestLaunch();





// fetch upcoming launch information
const upcomingLaunch = "https://api.spacexdata.com/v4/launches/upcoming/";

const upcomingContainer = document.querySelector(".upcomingContainer")
const upcomingImg = document.querySelector(".upcomingImgContainer")




async function getUpcomingLaunch() {
    try {
        const response = await fetch(upcomingLaunch);
        const result = await response.json();
        console.log(result)

        upcomingContainer.innerHTML = "";
        upcomingImg.innerHTML = "";

        let launchDetails = result[0].details;
        let noDetails = `We're sorry. Looks like the launch details are missing.`;
        if (!launchDetails) {
            launchDetails = noDetails;
        }

        upcomingImg.innerHTML = `<a href="details.html?id=${result[0].id}">
                                    <img class="upcoming-img" src="${result[0].links.patch.small}" alt="patch emblem of ${result[0].name}" onerror="this.src='images/rocket.jpg'"/>
                                </a>`;
                                
        
        
        upcomingContainer.innerHTML = `<div>
                                            <h2 class="rocketName mobile-margin">${result[0].name}</h2>
                                            <time class="launch-date mobile-margin">${result[0].date_local}</time>
                                            <div class="para para-margin">
                                                <p class="details">${launchDetails}</p>
                                            </div>                
                                        </div>`;

        // countdown
        const countdown = document.querySelector("#countdown-time");
        countdown.innerHTML = "";

        let localDate = result[0].date_utc;
 
        var countDownDate = new Date(localDate).getTime();

        var x = setInterval(function () {
            let now = new Date().getTime();

            var distance = countDownDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / (1000));
            
            countdown.innerHTML = `<span>${days}d ${hours}h ${minutes}m ${seconds}s</span>`;

            if (distance < 0) {
                clearInterval(x);
                countdown.innerHTML = `Launch date has expired`;
            }
        }, 1000);
        
       
    } catch (e) {
        console.log(e)
        upcomingContainer.innerHTML = displayError("Error has occured");
        upcomingImg.innerHTML = displayError("Error has occured");
    } finally {
        console.log("finally")
    }
}

getUpcomingLaunch();


// get past 6 launches SpaceX
const pastLaunches = "https://api.spacexdata.com/v4/launches/past/";

const timeline = document.querySelector(".timelineContainer")

async function getPastLaunches() {
    try {
        const response = await fetch(pastLaunches);
        const result = await response.json();
        result.reverse();
        console.log(result)

        timeline.innerHTML = "";
 
        for (let i = 0; i < result.length; i++) {

            let localDate = result[i].date_local;
            // convert iso date to month date year
            let dateOfLaunch = new Date(localDate),
            year = dateOfLaunch.getFullYear(),
            month = dateOfLaunch.getMonth() + 1,
            date = dateOfLaunch.getDate();
            let convertedDate = date + "/" + month + "/" + year;
           
            if (i <= 5) {         
                timeline.innerHTML += `<a id="timelineItem${i}" class="recentLaunchTarget" href="details.html?id=${result[i].id}">
                                            <div class="card-shadow-bg">
                                                <h3>${result[i].name}</h3>
                                                <p>${convertedDate}</p>
                                            </div>
                                        </a>`;
            }
         
            // loop all divs to set a background img or use default
            const recLaunchDiv = document.querySelectorAll(".recentLaunchTarget");
            for (let i = 0; i < recLaunchDiv.length; i++) {
                let imageURL = result[i].links.flickr.original[0];
                if (imageURL) {
                    recLaunchDiv[i].style.backgroundImage = `url(${imageURL})`;
                } else {
                    recLaunchDiv[i].style.backgroundImage = `url(images/falcon.jpg)`;
                }
            }
        }
    } catch (error) {
        console.log(error)
        timeline.innerHTML = displayError("Error has occured");
    }
}

getPastLaunches();



// fetch people in space
const url = "http://api.open-notify.org/astros.json";

const pplContainer = document.querySelector(".peopleInSpaceNames")
const peopleInSpace = document.querySelector(".currentPeopleInSpace")


async function getPeopleInSpace() {
    try {
        const response = await fetch(url);
        const json = await response.json();
        // console.log(json.people)
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
        pplContainer.innerHTML = displayError("Error has occured");
        peopleInSpace.innerHTML = displayError("Error has occured");
        
    }
}

getPeopleInSpace();



// iss location
const issLocation = "http://api.open-notify.org/iss-now.json";

const issContainer = document.querySelector(".issLocation")

async function getIssLocation() {
    try {
        const response = await fetch(issLocation)
        const location = await response.json()
        console.log(location)
        const latitude = location.iss_position.latitude;
        const longitude = location.iss_position.longitude;

        issContainer.innerHTML = `<span class="mobile-margin">Latitude: ${latitude} Longitude: ${longitude} </span><iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed" width="960" height="570" frameborder="0" style="border:0"></iframe>`;

    } catch (error) {
        console.log(error)
    } finally {
        console.log("location found")
    }
}

getIssLocation();


// recent launches slide track/thumb
const dotNav = document.querySelectorAll(".controller ul li");
const blah = document.querySelector(".slide-thumb")

let defaultPosition = "translateX(0%)";
let midPosition = "translateX(-50%)";
let endPosition = "translateX(-100%)";
// 
let defPos = "translateX(0%)";
let midPos = "translateX(100%)";
let endPos = "translateX(200%)";

// slides the image on click and adds/removes color
for (let i = 0; i < dotNav.length; i++) {
      dotNav[0].onclick = function slideRecent() {
        timeline.style.transform = defaultPosition;
        dotNav[0].style.color = "rgb(175, 175, 175)";
        dotNav[1].style.color = "rgb(78, 78, 78)";
        dotNav[2].style.color = "rgb(78, 78, 78)";
        blah.style.transform = defPos;
    }
    dotNav[1].onclick = function slideRecent() {
        timeline.style.transform = midPosition;
        dotNav[0].style.color = "rgb(78, 78, 78)";
        dotNav[1].style.color = "rgb(175, 175, 175)";
        dotNav[2].style.color = "rgb(78, 78, 78)";
        blah.style.transform = midPos;
    }
    dotNav[2].onclick = function slideRecent() {
        timeline.style.transform = endPosition;
        dotNav[0].style.color = "rgb(78, 78, 78)";
        dotNav[1].style.color = "rgb(78, 78, 78)";
        dotNav[2].style.color = "rgb(175, 175, 175)";
        blah.style.transform = endPos;  
    }    
}

// slides the images+ slide thumb depending on where you click
const sliderLinks = document.querySelectorAll(".bars")

for (let i = 0; i < sliderLinks.length; i++){
    sliderLinks[1].onclick = function moves(){
        blah.style.transform = endPos;
        timeline.style.transform = endPosition;
    }
    sliderLinks[0].onclick = function moves(){
        blah.style.transform = midPos;
        timeline.style.transform = midPosition;
    }
    sliderLinks[2].onclick = function moves(){
        blah.style.transform = defPos;
        timeline.style.transform = defaultPosition;
    }
}


// newsletter
const newsForm = document.querySelector("#news-form")
const submitmessage = document.querySelector(".success-msg")

submitmessage.style.display = "none";

function submitForm(event) {
    
    event.preventDefault();
    submitmessage.style.display = "block";
    submitmessage.innerHTML = `Thanks for subscribing!<span><i class="fas fa-check-circle"></i></span>`;
    newsForm.reset();
}


newsForm.addEventListener("submit", submitForm);


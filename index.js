const url = "http://api.open-notify.org/astros.json";

// const pplContainer = document.querySelector(".peopleInSpace")

// async function getPeopleInSpace() {
//     try {
//         const response = await fetch(url);
//         const json = await response.json();
//         console.log(json.people)
//         const people = json.people;

//         pplContainer.innerHTML = "";
        
//         for (let i = 0; i < people.length; i++){
//             pplContainer.innerHTML += `<div class="people">
//                                         <h3>${people[i].name}</h3>
//                                     </div>`;
//         }
//     } catch (error) {
//         console.log(error)
//         pplContainer.innerHTML = `an error has occured`;
        
//     }
// }

// getPeopleInSpace();

const pastLaunch = "https://api.spacexdata.com/v4/launches/latest";

const latestContainer = document.querySelector(".latest")

latestContainer.innerHTML = "";

async function getLatestLaunch(){
    try{
        const response = await fetch(pastLaunch);
        const result = await response.json();
        console.log(result)
        latestContainer.innerHTML = `<div>
                                    <h2>Latest launch</h2>
                                    <h3 class="rocketName">${result.name}</h3>
                                    <span class="date">${result.date_local}</span>
                                    <div class="para">
                                        <p class="details">${result.details}</p>
                                    </div>                         
                                    </div>`;

    } catch (e) {
        console.log(e)
    } finally {
        console.log("finally")
    }
}

getLatestLaunch();

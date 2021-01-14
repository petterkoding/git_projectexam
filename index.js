const url = "http://api.open-notify.org/astros.json";

const pplContainer = document.querySelector(".peopleInSpace")

async function getPeopleInSpace() {
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.people)
        const people = json.people;

        pplContainer.innerHTML = "";
        
        for (let i = 0; i < people.length; i++){
            pplContainer.innerHTML += `<div class="people">
                                        <h3>${people[i].name}</h3>
                                    </div>`;
        }
    } catch (error) {
        console.log(error)
        pplContainer.innerHTML = `an error has occured`
        
    }
}

getPeopleInSpace();

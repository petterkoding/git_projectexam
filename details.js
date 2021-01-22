const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (id === null) {
  location.href = "/";
}

const url = "https://api.spacexdata.com/v4/launches/" + id;


async function fetchDetails() {
    try {
      const response = await fetch(url);
        const json = await response.json();
        console.log(json);
      createHtml(json);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("Finally");
    }
  }
  
fetchDetails();
  
const detailsContainer = document.querySelector(".detailsContainer")
const detailImgContainer = document.querySelector(".detail-img-container")

function createHtml(json) {

  detailsContainer.innerHTML = "";
  detailImgContainer.innerHTML = "";

  document.title = `${json.name}`;

  detailImgContainer.innerHTML = `<img class="detail-img-styles" src="${json.links.flickr.original[0]}" alt="Image of SpaceX rocket on launch sites " onerror="this.src='images/falcon.jpg'"/>`;
  detailsContainer.innerHTML = `<div>
                                      <h1>${json.name}</h1>
                                      <p>${json.details}</p>
                              
                                </div>`;
   

}
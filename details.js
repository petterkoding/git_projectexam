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
const detailGallery = document.querySelector(".details-bottom-img")
const readMore = document.querySelector(".read-more")

function createHtml(json) {

  detailsContainer.innerHTML = "";
  detailImgContainer.innerHTML = "";
  detailGallery.innerHTML = "";
  readMore.innerHTML = "";

  document.title = `${json.name}`;

  let hasDetails = json.details;
  let noDetails = `We're sorry. Looks like the launch details are missing.`;
  if(!hasDetails){
    hasDetails = noDetails;
  }

  let readMoreLink = "";
  let wikipediaLink = `<a class="button dark" href="https://en.wikipedia.org/wiki/SpaceX" target="_blank">Read more</a>`;
  let articleLink = `<a class="button dark" href="${json.links.article}" target="_blank">Read more</a>`;
  if (!json.links.article) {
    // if theres no article, use wikipedia as url
    readMoreLink = wikipediaLink;
  } else {
    readMoreLink = articleLink;
  }
  // video
  let watch = "";
  let youtubeLink = `<a class="button dark" href="https://www.youtube.com/c/SpaceX/videos" target="_blank">Watch</a>`;
  let webcastLink = `<a class="button dark" href="${json.links.webcast}" target="_blank">Watch</a>`;
  if (!json.links.webcast) {
    // if theres no webcast, use youtube as url
    watch = youtubeLink;
  } else {
    watch = webcastLink;
  }

  detailImgContainer.innerHTML = `<img class="two-col-img" src="${json.links.flickr.original[0]}" alt="Image of SpaceX rocket on launch sites " onerror="this.src='images/falcon.jpg'"/>`;
  detailsContainer.innerHTML = `<div class="two-col-info">
                                  <h1 class="detail-heading mobile-margin">${json.name}</h1>
                                  <div class="para para-margin">
                                    <p>${hasDetails}</p>
                                  </div>

                                  <div>
                                    ${readMoreLink}
                                    ${watch}
                                  </div>
                                </div>`;
  
  // read more
  readMore.innerHTML = `<div class="para">
                          <h3 class="mobile-margin"><span>Aim high</span> Sky's the limit</h3>
                          <p class="mobile-margin">
                            If you'd like to read more about SpaceX on Wikipedia or their collaboration with NASA please visit:
                          </p>
                          <a class="link mobile-margin" href="https://www.nasa.gov/mission_pages/station/structure/launch/spacex.html" target="_blank"><i class="fas fa-link"></i> Nasa SpaceX</a>
                          <a class="link mobile-margin" href="https://en.wikipedia.org/wiki/SpaceX" target="_blank"><i class="fas fa-link"></i> Spacex Wikipedia</a>
                        </div>`;
  
  
  // gallery images
  detailGallery.innerHTML = `<img src="${json.links.flickr.original[1]}" alt="Image of ${json.name}" onerror="this.src='images/falcon.jpg'"/>`;
   
  // create html
  const rocketURL = "https://api.spacexdata.com/v4/rockets/";
  const rocketDetails = document.querySelector(".rocket-details")

  rocketDetails.innerHTML = "";

  async function fetchRockets() {
      try {
        const response = await fetch(rocketURL);
          const rockets = await response.json();
        console.log(rockets);
        
        for (let i = 0; i < rockets.length; i++){
          // check if rocket id matches
          if (rockets[i].id === json.rocket) {
            rocketDetails.innerHTML = `
            <div class="para para-margin">
              <h3>Rocket used</h3>
              <div class="data-row">
                <h4>Name</h4>
                <span>${rockets[i].name}</span>
              </div>
              <div class="data-row">
                <h4>Engine type</h4>
                <span>${rockets[i].engines.type} (${rockets[i].engines.propellant_1}/${rockets[i].engines.propellant_2})</span>
              </div>
              <div class="data-row">
                <h4>Height/Diameter</h4>
                <span>${rockets[i].height.meters}m / ${rockets[i].diameter.meters}m</span>
              </div>
              <div class="data-row">
                <h4>Mass</h4>
                <span>${rockets[i].mass.kg} kg</span>
              </div>
              <div class="data-row">
                <h4>First flight</h4>
                <span>${rockets[i].first_flight}</span>
              </div>
              <div class="data-row">
                <h4>Cost</h4>
                <span>${rockets[i].cost_per_launch} $</span>
              </div>
              <div class="data-row">
                <h4>Wikipedia</h4>
                <span><a class="txt-link" href="${rockets[i].wikipedia}">${rockets[i].name} <i class="fas fa-link"></i></a></span>
              </div>
            </div>
            <div class="para para-margin">
              <h4>Description</h4>
              <p>${rockets[i].description}</p>
            </div>`;
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        console.log("Rocket details found");
      }
    }
    
  fetchRockets();



}










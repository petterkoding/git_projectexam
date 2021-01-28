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
const detailGallery = document.querySelector(".details-gallery")
const readMore = document.querySelector(".read-more")

function createHtml(json) {

  detailsContainer.innerHTML = "";
  detailImgContainer.innerHTML = "";
  detailGallery.innerHTML = "";
  readMore.innerHTML = "";

  document.title = `${json.name}`;

  detailImgContainer.innerHTML = `<img class="two-col-img" src="${json.links.flickr.original[0]}" alt="Image of SpaceX rocket on launch sites " onerror="this.src='images/falcon.jpg'"/>`;
  detailsContainer.innerHTML = `<div class="two-col-info">
                                  <h1 class="detail-heading">${json.name}</h1>
                                  <div class="para">
                                    <p>${json.details}</p>
                                  </div>

                                  <div>
                                    <a class="button dark" href="${json.links.article}" target="_blank">Read more</a>
                                    <a class="button dark" href="${json.links.webcast}" target="_blank">Watch</a>
                                  </div>
                                </div>`;
  
  // read more
  readMore.innerHTML = `<div class="para">
                          <h3><span>Aim high</span> Sky is the limit</h3>
                          <p>
                            If you'd like to read more about SpaceX collaboration with NASA please visit:
                          </p>
                          <div>
                            <a class="link" href="https://www.nasa.gov/mission_pages/station/structure/launch/spacex.html" target="_blank">Nasa SpaceX</a>
                          </div>
                          
                          <div>
                            <p>
                              For tons of updated images go to SpaceX official photo gallery on Flickr:
                            </p>
                            <a class="link" href="https://www.flickr.com/photos/spacex" target="_blank">Spacex photo gallery</a>
                          </div>
                        </div>`;
  
  
  // gallery images
  detailGallery.innerHTML = `<img src="${json.links.flickr.original[1]}" alt="Image of ${json.name}" onerror="this.src='images/falcon.jpg'"/>
                            <img src="${json.links.flickr.original[3]}" alt="Image of ${json.name}" onerror="this.src='images/falcon.jpg'"/>`;
   

}
const url = "https://api.spacexdata.com/v4/launches/past/";

const gallery1 = document.querySelector(".galleryContainer1")
const gallery2 = document.querySelector(".galleryContainer2")

async function getImages() {
    try {
        const response = await fetch(url);
        const images = await response.json();
        images.reverse();
        console.log(images);
        for (let i = 0; i < images.length; i++){
            if (i <= 10) {
                const image = images[i].links.flickr.original[1];

                gallery1.innerHTML +=
                `<div class="gallery-item1">
                    <img class="gallery-images" src="${image}" alt="SpaceX rocket launch images" onerror="this.src='images/falcon.jpg'"/>
                </div>`;
            }
            if (i > 32 && i < 51) {

                const image2 = images[i].links.flickr.original[2];
                gallery2.innerHTML +=
                `<div class="gallery-item2">
                    <img class="gallery-images" src="${image2}" alt="SpaceX rocket launch images" onerror="this.src='images/falcon.jpg'"/>
                </div>`;
            }
         
            
        }
            
            
    } catch (error) {
        console.log(error)
    } finally {
        console.log("finally")
    }

    
}

getImages();
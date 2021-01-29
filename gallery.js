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
            if (i <= 7) {
                const image = images[i].links.flickr.original[1];

                gallery1.innerHTML +=
                `<div class="gallery-item1">
                    <img class="gallery-images" src="${image}" alt="SpaceX rocket launch images" onerror="this.src='images/falcon.jpg'"/>
                    <span class="gallery-item-name">${images[i].name}</span>
                </div>`;
            }
            if (i > 32 && i < 45) {

                const image2 = images[i].links.flickr.original[2];
                gallery2.innerHTML +=
                `<div class="gallery-item2">
                    <img class="gallery-images" src="${image2}" alt="SpaceX rocket launch images" onerror="this.src='images/falcon.jpg'"/>
                    <span class="gallery-item-name">${images[i].name}</span>
                </div>`;
            }
         
        }
            
            
    } catch (error) {
        console.log(error)
    } finally {
        console.log("Fetched Gallery")
    }

    
}

getImages();



// astronomy pic of the day NASA API

const APOD = "https://api.nasa.gov/planetary/apod?api_key=CT08nZ3bjuw24OL46lUhgeLg4OcNB8R09U01CoOb";

const picOfTheDay = document.querySelector(".picture-of-the-day");
const apodExp = document.querySelector(".apod-ex")

picOfTheDay.innerHTML = "";
apodExp.innerHTML = "";

async function getAPOD() {
    try {
        const response = await fetch(APOD);
        const imageOfTheDay = await response.json();
        console.log(imageOfTheDay);

        // create html
        picOfTheDay.innerHTML = `<div class="apod-container">
                                    <img src="${imageOfTheDay.url}" alt="${imageOfTheDay.explanation}"/>
                                    <p><span>Copyright&copy; ${imageOfTheDay.copyright}</span></p>
                                </div>`;
        
        apodExp.innerHTML = `<h2>Astronomy picture of the Day</h2>
                            <h3>${imageOfTheDay.title}</h3>
                            <div class="para">
                                <p>This incredible photo was taken by ${imageOfTheDay.copyright} ${imageOfTheDay.date}</p>
                            </div>

                            <div class="para apod-congrats">
                                <p>Everyone at SpaceX Cowboys was blown away by this stunning and highly detailed photo.
                                We congratulate ${imageOfTheDay.copyright} for this beautiful photo and winning the APOD.
                                </p>
                            </div>
            
                            <div class="enter-photo-poll">
                                <h4>Want your own photo shown here?</h4>
                                <div class="para">
                                    <p>Each day we select a subscribers photo to be highlighted here.
                                    For a chance you must be following our twitter account.
                                    Tweet your photo at us to enter!
                                    <a class="soMe-link" href="https://www.twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
                                    </p>
                                </div>
                            </div>`;

    } catch (error) {
        console.log(error)
    } finally {
        console.log("Fetched APOD");
    }
}

getAPOD();
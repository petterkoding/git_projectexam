// astronomy pic of the day NASA API

const APOD = "https://api.nasa.gov/planetary/apod?api_key=CT08nZ3bjuw24OL46lUhgeLg4OcNB8R09U01CoOb";

const picOfTheDay = document.querySelector(".picture-of-the-day");
const apodExp = document.querySelector(".apod-ex")
const apodTitle = document.querySelector(".apod-title")



async function getAPOD() {
    try {
        const response = await fetch(APOD);
        const imageOfTheDay = await response.json();
        console.log(imageOfTheDay);

        picOfTheDay.innerHTML = "";
        apodExp.innerHTML = "";
        apodTitle.innerHTML = "";

        // create html
        let copyright = imageOfTheDay.copyright;
        let credit = `Unknown`;
        if (copyright) {
            credit = copyright;
        }

        let mediaType = "";
        
        // filter media type and display correct syntax for image/video
        if (imageOfTheDay.media_type === "image") {
            mediaType = `<img class="apod-image" src="${imageOfTheDay.url}" alt="${imageOfTheDay.title}"/>`;
        }
        if (imageOfTheDay.media_type === "video") {
            mediaType = `<iframe width="1000px" height="700px" src="${imageOfTheDay.url}" </iframe>`;
        }

        picOfTheDay.innerHTML = `<figure class="apod-container">
                                    ${mediaType}    
                                    <figcaption>Copyright&copy; ${credit}</figcaption>
                                </figure>`;
        apodTitle.innerHTML = `<div>
                                <h2 class="orange-border">Astronomy picture of the Day</h2>
                                <h3>${imageOfTheDay.title}</h3>
                                </div>`;
        
        apodExp.innerHTML = `<div class="para">
                                <p>This incredible ${imageOfTheDay.media_type} was taken by ${credit} ${imageOfTheDay.date}</p>
                            </div>

                            <div class="para apod-congrats">
                                <p>Everyone at SpaceX Cowboys was blown away by this stunning and highly detailed ${imageOfTheDay.media_type}.
                                Congratulations for winning the APOD.
                                </p>
                            </div>
                            <div class="enter-photo-poll">
                                <h3>Weekly winners</h3>
                                <div class="para">
                                    <p>Each week, we pick 3 submissions that gets a free t-shirt and an official SpaceX Cowboys coffee mug!</p>
                                </div>
                            
                                <h4>Want your own photo shown here?</h4>
                                <div class="para">
                                    <p>Each day we select a subscribers photo to be highlighted here.
                                    For a chance you must follow and tweet your photo at us to enter!
                                    
                                    </p>
                                    <div>
                                        <a class="soMe-link" href="https://www.twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
                                    </div>
                                </div>
                            </div>`;

    } catch (error) {
        console.log(error)
        picOfTheDay.innerHTML = displayError("Error has occured");
        apodExp.innerHTML = displayError("Error has occured");
        apodTitle.innerHTML = displayError("Error has occured");
        
    } finally {
        console.log("Finally");
    }
}

getAPOD();




// gallery
const url = "https://api.spacexdata.com/v4/launches/past/";

const gallery1 = document.querySelector(".galleryContainer1")
const gallery2 = document.querySelector(".galleryContainer2")


async function getImages() {
    try {
        const response = await fetch(url);
        const images = await response.json();
        images.reverse();
        console.log(images);

        gallery1.innerHTML = "";
        gallery2.innerHTML = "";
        for (let i = 0; i < images.length; i++){
            
            // modal
            const modal = document.querySelector(".modal");
            const fullImg = document.querySelector(".full-img");
            const caption = document.querySelector(".caption");
            const galleryImages = document.querySelectorAll(".gallery-images");

            galleryImages.forEach(img => {
            img.addEventListener("click", (e) => {
                modal.classList.add("open");
                let imgSrc = e.target.src;
                let imgAlt = e.target.alt;
                fullImg.src = imgSrc;
                caption.innerHTML = `${imgAlt}`;
                
                })
            })
            // close when user clicks outside
            modal.addEventListener("click", (e) => {
            if (e.target.classList.contains("modal")) {
                modal.classList.remove("open");
                }
            })

            if (i <= 7) {
                const imageSrc = images[i].links.flickr.original[1];

                gallery1.innerHTML +=
                `<div class="gallery-item1">
                    <img class="gallery-images" src="${imageSrc}" alt="${images[i].name}  &copy; SpaceX Flickr" onerror="this.src='images/falcon.jpg'"/>
                    <span class="gallery-item-name">${images[i].name}</span>
                </div>`;
            }
            if (i > 32 && i < 45) {
              
                // fetch different images
                const image2 = images[i].links.flickr.original[2];
                gallery2.innerHTML +=
                `<div class="gallery-item2">
                    <img class="gallery-images" src="${image2}" alt="${images[i].name}  &copy; SpaceX Flickr" onerror="this.src='images/falcon.jpg'"/>
                    <span class="gallery-item-name">${images[i].name}</span>
                </div>`;
            }
           

        }
        

            
    } catch (error) {
        console.log(error)
        gallery1.innerHTML = displayError("Error has occured");
        gallery2.innerHTML = displayError("Error has occured");
    } finally {
        console.log("Finally")
    }

    
}

getImages();





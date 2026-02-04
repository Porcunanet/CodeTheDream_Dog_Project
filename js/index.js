const dogImage = document.getElementById('dog-image');
const breedName = document.getElementById('breed-name');
const refreshBtn = document.getElementById('refresh-btn');

const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": "DEMO-API-KEY" // Replace with your actual key for higher limits
});

const requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

function getDog() {
    // Show loading state
    breedName.innerText = "Searching for a pup...";
    
    fetch("https://pro-api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
        .then(response => response.json()) // Changed from .text() to .json() to access properties
        .then(result => {
            const dogData = result[0];
            dogImage.src = dogData.url;
            
            // Display breed name if available
            if (dogData.breeds && dogData.breeds.length > 0) {
                breedName.innerText = dogData.breeds[0].name;
            } else {
                breedName.innerText = "A mysterious (but cute) breed";
            }
        })
        .catch(error => {
            console.log('error', error);
            breedName.innerText = "Oh no! The dog escaped. Try again.";
        });
}

// Load a dog immediately on page load
getDog();

// Load a new dog when the button is clicked
refreshBtn.addEventListener('click', getDog);

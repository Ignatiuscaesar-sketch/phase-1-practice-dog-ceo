document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const imageContainer = document.getElementById('dog-image-container');
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const breedList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    // Fetch and display images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(image => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = "Random Dog Image";
                imageContainer.appendChild(img);
            });
        });

    // Fetch and display breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            breeds.forEach(breed => {
                const li = document.createElement('li');
                li.textContent = breed;
                li.style.cursor = 'pointer';  // Make it visually clear that items are clickable
                breedList.appendChild(li);
            });
            return breeds;  // Return breeds for further use
        })
        .then(breeds => {
            // Click event to change the font color of clicked breed
            breedList.addEventListener('click', function(e) {
                if (e.target.tagName === 'LI') {
                    e.target.style.color = 'red';  // Change to any color you prefer
                }
            });

            // Filter breeds based on the selected letter from the dropdown
            breedDropdown.addEventListener('change', function(e) {
                const selectedLetter = e.target.value;
                const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter));
                breedList.innerHTML = '';  // Clear current list
                filteredBreeds.forEach(breed => {
                    const li = document.createElement('li');
                    li.textContent = breed;
                    li.style.cursor = 'pointer';
                    breedList.appendChild(li);
                });
            });
        });
});

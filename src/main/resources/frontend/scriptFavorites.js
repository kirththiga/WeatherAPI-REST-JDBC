const host = "http://localhost:8080";

// ************************************** Index Page - Favorites List ****************************************

let city = "";

// Validate the city input field
document.getElementById("city").addEventListener("input", function () {
      
  city = document.getElementById("city").value.trim();
  const isValidCity = validateCityInput(city);

  if(isValidCity) {
    document.getElementById("city").classList.add("is-valid");
    document.getElementById("city").classList.remove("is-invalid");
    addFavoriteBtn.disabled = false;
    deleteFavoriteBtn.disabled = false;
  } 
  else {
    document.getElementById("city").classList.remove("is-valid");
    document.getElementById("city").classList.add("is-invalid");
    addFavoriteBtn.disabled = true;
    deleteFavoriteBtn.disabled = true;
  }
});

document.getElementById("favoriteForm").addEventListener("submit", function (e) {
  e.preventDefault();
      
  // Alert if the user clears or doesn't enter a city name.
  if (city === "") {
    addFavoriteBtn.disabled = true;
    deleteFavoriteBtn.disabled = true;
    alert("Enter a valid city name! No blank fields allowed!");
    return;
  }
});
  
getFavorites();

document.getElementById("addFavoriteBtn").addEventListener("click", function () {
 
  const visited = document.getElementById("visited").checked;
  const labelInput = document.getElementById("favorite-label").value.trim() || "None";
  const ranking = parseInt(document.getElementById("ranking").value);

  fetch(`${host}/api/favorite?city=${city}&visited=${visited}&label=${labelInput}&ranking=${ranking}`, {
      method: 'POST',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add favorite city.');
      }
      return response.json();
    })
    .then(data => {
      alert(`Favorite added: ${data.name}, ${data.country}`);
      
      // Get updated favoriteList
      getFavorites();
      clearFields();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while adding the favorite.');
    });

});

document.getElementById("deleteFavoriteBtn").addEventListener("click", function () {

  city = document.getElementById("city").value.trim();

  fetch(`${host}/api/favorite/city/${city}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete favorite city.');
      }
      return response.text();
    })
    .then(data => {
      alert("Deleted");

      // Get updated favoriteList
      getFavorites();
      clearFields();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while deleting the favorite.');
    });

});


document.getElementById("updateLabelBtn").addEventListener("click", function () {

  city = document.getElementById("city").value.trim();
  const updateLabel = document.getElementById("favorite-label").value.trim();

  fetch(`${host}/api/favorite/label?city=${city}&label=${updateLabel}`, {
      method: 'PUT',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update label.');
      }
      return response.text();
    })
    .then(data => {
      alert("Updated label!");

      // Get updated favoriteList
      getFavorites();
      clearFields();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while updating the label.');
    });

});

document.getElementById("updateRankingBtn").addEventListener("click", function () {

  city = document.getElementById("city").value.trim();
  const updateRanking = parseInt(document.getElementById("ranking").value);

  fetch(`${host}/api/favorite/ranking?city=${city}&ranking=${updateRanking}`, {
      method: 'PUT',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update ranking.');
      }
      return response.text();
    })
    .then(data => {
      alert("Updated ranking!");

      // Get updated favoriteList
      getFavorites();
      clearFields();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while updating the ranking.');
    });

});


// Clear input fields
document.getElementById("clearBtn").addEventListener("click", function () {
  clearFields();
});

//*********************** Function to get favorites ***********************
function getFavorites() {
  fetch(`${host}/api/favorite`)
  .then((res) => {
    if(!res.ok) {
      throw new Error("Failed to fetch favorite cities!");
    }
    
    return res.json();
  })
  .then((data) => {

      favoriteList.innerHTML = data.map(item => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>${item.id}</strong>: ${item.name}, ${item.region}, ${item.country} | <strong>Label:</strong> ${item.label} | <strong>Ranking:</strong> ${item.ranking} | <strong>Visited:</strong> ${item.visited ? "Yes" : "No"}
          </div>
          <button class="btn btn-sm btn-danger" onclick="deleteFavorite(${item.id})">Delete</button>
        </li>
      `).join('');
  });
}


//*********************** Function to delete an individual favorite item ***********************
function deleteFavorite(id) {

  fetch(`${host}/api/favorite/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete favorite city.');
      }
      return response.text();
    })
    .then(data => {
      alert("Deleted");
      
      // Get updated favoriteList
      getFavorites();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while deleting the favorite.');
    });

}

//*********************** Function to clear the input fields ***********************
function clearFields() {
  city = "";
    
  document.getElementById("city").value = "";
  document.getElementById("city").focus();
  document.getElementById("city").classList.remove("is-valid");
  
  document.getElementById("visited").checked = false;
  document.getElementById("favorite-label").value = "";
  document.getElementById("ranking").value = "";
}
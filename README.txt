-Use the fsd14_project database and update the password in application.properties. 
-Run the schema.sql to create the favorites table and to populate the initial data.

Added Swagger dependency, so you can access the API documentation at:
http://localhost:8080/swagger-ui/index.html

-The index.html page has been updated to list the favorite cities entered, updated and deleted by the user.
-The index page has a button to go to the pages from the previous project.
-The scriptFavorites.js uses the REST APIs to fetch the data and display it on the webpage.

*To DELETE, enter CITY ONLY, OR click DELETE next to the item on the list.
*To UPDATE label or ranking, enter city and label OR ranking.

/************************** Project from previous course **************************/
API: 
Weather API: https://www.weatherapi.com/docs/
const baseUrl = "http://api.weatherapi.com/v1";

Used Windy API to display the map forecast. 
Need the leaflet and windy API library to display map.
  <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>
  <script src="https://api.windy.com/assets/map-forecast/libBoot.js"></script>

Description:
1. Enter a city name in the form.
2. Choose to display the temperature in °C or °F (toggle switch). 
3. Click "Get Weather".
4. Click on 5 day or 10 day forecast button to see the forecast for the next 5 or 10 days. 

Current Weather Page:
- There is validation feedback when entering the city's name (only letters can be entered). 
- There is a clear button to clear the city name from the form.
- An alert is displayed if the city name is blank.
- The background color changes when you hover on the list item on the index page. 
- The windy map appears when the city name is entered correctly.

Forecast Pages:
- The 10 day forecast can be filtered to display the temperatures less than or greater than
  a temperature entered by the user.
- The filter can be reset to display the 10 day forecast.
- The font is bold when you hover on the buttons (weather today, 5 day, and 10 day).
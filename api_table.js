function displayAirQuality(cities) {
  var token = '70fadfb476b116e0f82d87a98f4f3786b2e45d9d'; 

  // Create the table and table headers
  var table = document.createElement('table');
  table.className = 'air-quality-table'; // Add the .air-quality-table class to the table
  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  var th1 = document.createElement('th');
  th1.textContent = 'City';
  var th2 = document.createElement('th');
  th2.textContent = 'AQI';
  var th3 = document.createElement('th');
  th3.textContent = 'AQI Level'
  var th4 = document.createElement('th');
  th4.textContent = 'Latest Time Retrieved';
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  thead.appendChild(tr);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement('tbody');
  table.appendChild(tbody);

  // Add the table to the page
  document.body.appendChild(table);

  // Array to store air quality data for each city
  var airQualityData = [];

  // Retrieve air quality information for each city
  cities.forEach(function(city) {
    var url = 'https://api.waqi.info/feed/' + city + '/?token=' + token;

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Store air quality data for the city in the array
        airQualityData.push({
          city: data.data.city.name,
          aqi: data.data.aqi,
          time: data.data.time.s
        });

        // If all cities have been processed, create and add rows to the table in sorted order
        if (airQualityData.length === cities.length) {
          airQualityData.sort(function(a, b) {
            return a.city.localeCompare(b.city);
          });

          airQualityData.forEach(function(data) {
            // Add a row to the table for the city
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.textContent = data.city;
            var td2 = document.createElement('td');
            td2.textContent = data.aqi;
            // Color the cell based on the AQI value
            if (data.aqi >= 0 && data.aqi <= 50) {
              td2.style.backgroundColor = '#4CAF50';
            } else if (data.aqi >= 51 && data.aqi <=100) {
              td2.style.backgroundColor = 'yellow';
            } else if (data.aqi >=101 && data.aqi <=150) {
              td2.style.backgroundColor = 'orange';
            } else if (data.aqi >=151 && data.aqi <=200) {
              td2.style.backgroundColor = 'red';
            } else if (data.aqi >=201 && data.aqi <=300) {
              td2.style.backgroundColor = 'purple';
            } else if (data.aqi >300) {
              td2.style.backgroundColor = 'violet';
            }
            var td3 = document.createElement('td');
            // Display the AQI level as a text label
            if (data.aqi >= 0 && data.aqi <=50) {
              td3.textContent = 'Good';
              td3.style.backgroundColor = '#4CAF50';
            } else if (data.aqi >=51 && data.aqi <=100) {
              td3.textContent = 'Moderate';
              td3.style.backgroundColor = 'yellow';
            } else if (data.aqi >=101 && data.aqi <=150) {
              td3.textContent = 'Unhealthy for Sensitive Groups';
              td3.style.backgroundColor = 'orange';
            } else if (data.aqi >=151 && data.aqi <=200) {
              td3.textContent = 'Unhealthy';
              td3.style.backgroundColor = 'red';
              td3.style.color = 'white';
            } else if (data.aqi >=201 && data.aqi <=300) {
              td3.textContent = 'Very Unhealthy';
              td3.style.backgroundColor = 'purple';
              td3.style.color = 'white';
            } else if (data.aqi >300) {
              td3.textContent = 'Hazardous';
              td3.style.backgroundColor = 'indigo';
              td3.style.color = 'white';
            }
            var td4 = document.createElement('td');
            td4.textContent = data.time;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbody.appendChild(tr);
          });
        }
      });
  });
}



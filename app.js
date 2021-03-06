const city = document.querySelector('#city');

const submit = document.querySelector('.submit');

submit.addEventListener('click', pullData);


function pullData(e) {
  const loc = new weatherDetails;

  const ui = new UI;

  loc.locData(city.value).then((response) => {

    if (response.length === 0) {
      const data1 = document.querySelector('.data1');
      data1.innerHTML = `<h2>Entered city value is incorrect.......</h2>`;
      data1.style.color = 'red';
      setTimeout(() => {
        data1.innerHTML = '';
      }, 3000);
    } else if (response.length >= 1) {
    response.forEach((repo, index)=> {
      if (index === 0) {
        loc.currentWeather(repo.Key).then((current) => {
          console.log(current);
          ui.currentData_UI_Update(current, response);
        })
        loc.locWeather(repo.Key).then((hourlyData) => {
          console.log(hourlyData);
        })

        }
      });
      
    }
//     else {
//       loc.currentWeather(response[0].Key).then((current) => {
//         console.log(current, response);
//         ui.currentData_UI_Update(current, response);
//       })
//       loc.locWeather(response[0].Key).then((hourlyData) => {
//         console.log(hourlyData);
//       })
    
// }

  })
}

class weatherDetails{
 constructor() {
   this.id = 'G3Mn6GZwqHpVTxAXgSGUQ4CmZ1EUAvkY';//58Gh8VytOsjyVO6hGMIEGTmGJzvvRd1d
  }
  
  async locData(e) {
    
    const locdetail = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${this.id}&q=${city.value}`);
  
    // console.log(locdetail);
  
    const response = await locdetail.json();

    // console.log(response);

    // console.log(response.length);
  
    return response;
  }

  async locWeather(locationid) {
    const weather = await fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationid}?apikey=${this.id}`);

    // console.log(weather);

    const hourlyData = await weather.json();

    return hourlyData;
  }
  
  async currentWeather(locationid) {
    const temp = await fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${locationid}?apikey=${this.id}`);

    const current = await temp.json();

    return current;
  }

}

class UI{

  currentData_UI_Update(current, response) {
    console.log(current);
    const temp = Math.floor(((current[0].Temperature.Value)-32) * 0.56);
    const data1 = document.querySelector('.data1');
    data1.innerHTML = `<h3 class="place">${response[0].LocalizedName},${response[0].AdministrativeArea.LocalizedName} </h3>
    <img class="weather-icon" src="./Weather/${current[0].WeatherIcon}.png">
    <h3 class="icon-phrase">${current[0].IconPhrase}<h3>
    <h2 class="temperature">${temp}&#8451</h2>
    <h3 class-"rain-possibility>Chance of Rain: ${current[0].PrecipitationProbability}&#37</h3>`;
  }
}

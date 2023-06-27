
const inputVa = document.getElementById("search");
const mainEl = document.getElementById("main");

function ADDTHeWeather(weatherP) {
  const div = document.getElementById("main");
  if(weatherP.name !== undefined){
    const h1 = document.createElement("h1")
    h1.id = "city";
    div.appendChild(h1);
    const cityN = document.getElementById("city");
    
    const h2 = document.createElement("h1");
    h2.id = "tem";
    div.appendChild(h2);
    const temp = document.getElementById("tem");
    temp.innerHTML = Math.round(weatherP.main.temp) + '°C';
    cityN.innerHTML = weatherP.name;
    FetchTempEvery3Hou(weatherP)

  }
  // <h1 id="city">Roma</h1>
  // <!-- <h6>Chance of Rain 0%</h6> -->
  // <h1 id="tem">31&deg</h1>
  else{
    console.log("the city is not correct");
    inputVa.value ="the city name is not found"
    inputVa.value.style.color ="red";

  }
}
const ErSearch = document.createElement("p")
ErSearch.id ="er-se";
ErSearch.className = "er-se";


function FetchWerather(query) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=b6a38593bb7d52e693089a7a9babb825`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.q === "undefined"){
            data = "";
        }
        else{
            ADDTHeWeather(data);
        }
        console.log(data)
    }).catch(()=>{
      inputVa.value = "Check Your City Name";
      inputVa.style.color = "red" ;
    })
}

const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent form submission
  const searchInput = document.getElementById('search');
  const searchQuery = searchInput.value;
  FetchWerather(searchQuery);
FetchTempEvery3Hou(searchQuery);
});

// const timeStrings = dateTimeStrings.map(dateTimeString => dateTimeString.substr(11, 8));

// console.log(timeStrings);
// utput: ["09:00:00", "09:00:00", "09:00:00", "09:00:00", "09:00:00"]
FetchTempEvery3Hou()
const ElemntTimeTemp = document.getElementById("time-tempu");

function FetchTempEvery3Hou(query){

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=b6a38593bb7d52e693089a7a9babb825`)
  .then(response => response.json())
  .then(data => {


    const rainCh = document.getElementById("chance-rain");
    const wind = document.getElementById("wind");
    const windSpeedFromApi = data.list[0].wind.speed;
    wind.innerHTML = windSpeedFromApi + "km/h";
    const raindChnaceFromApi = data.list[0].pop
    rainCh.innerHTML = raindChnaceFromApi + "%"

    console.log(raindChnaceFromApi);
  const realFe = document.getElementById("realFeel");
  const  RealFeelFromApi = data.list[0].main.feels_like;
  console.log(RealFeelFromApi);

  realFe.innerHTML = Math.round( RealFeelFromApi);
    const temperatureData = [];
    for (let i = 0; i < data.list.length; i +=8) {
      temperatureData.push(data.list[i].main.temp);

    }
    // console.log(temperatureData);
    console.log(data)
    const H4FromTem = document.querySelectorAll("h4");
    for (let i = 0; i < H4FromTem.length && i < temperatureData.length; i++) {
      H4FromTem[i].textContent = Math.round( temperatureData[i]) + "°C";
    }

  })
  .catch(error => console.log(error));
}


// display the main from the wethear linl //
const weatherLINK = document.getElementById("w");
weatherLINK.addEventListener("click",()=>{
  const main = document.getElementById("mainDisplay");
  main.style.display = "flex";
  const img = document.getElementById("img");
  img.style.display = "none";
})
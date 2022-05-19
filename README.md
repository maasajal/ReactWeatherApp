# Android Weather App

### Screenshots

* GPS Allow on my android...
![Image of Weather App Allow GPS](/assets/weatherapp1.jpg)

* Weather App display on my android...
![Image of Weather App](/assets/weatherapp2.jpg)

* Weather App display on Emulator
![Image of Weather App in Emulator](/assets/weatherapp3.png)


### About Project
This is a weather application that displays weather conditions like temperature, icon, city + state, sunrise time, sunset time, maximun & minimum temperature and so on. The application is making with React Native (nodejs). The application is used OpneWeatherMap API. This is a simple weather app. After installl the app, when user first time open the app it will ask to allow GPS for display current weather in user's area. After allow GPS, it will connect with RESTful API (OpenWeatherMap) and show weather conditions.


### Target
Android Phones


### Requirements
* Location (GPS) access



### Features
* Location access
    * Link: https://docs.expo.io/versions/latest/sdk/location/
* OpenWeatherMap
    * Link: https://openweathermap.org/current
* Font Awesome Icons
* Material Community Icons
* Local time


### Language
React Native


## How to use this code...

* First of all, clone the repository
    * git clone https://github.com/sajal-se/WeatherApp.git

* Open terminal and go to directory
    * cd WeatherApp
    * npm install

* Api key change
    * open WeatherApp.js file from components folder
    * use your api key (Change API KEY= '......')
    ```WeatherApp.js
        let API_KEY = '01a9f3006fed543d8ba50050746836db';
    ```

* Run and scan QR code with your expo app
    * run the app: $ expo start

* Allow location

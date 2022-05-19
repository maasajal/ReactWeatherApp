import React from "react";
import {StyleSheet, Text, Image, View, ScrollView } from "react-native";
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';

let API_KEY = '01a9f3006fed543d8ba50050746836db';
export default function Weather({ lat, lon }) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${'Metric'}&appid=${API_KEY}`;
  // console.log(url);
  const [city, setCity] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [icon, setIcon] = React.useState(null);
  const [temp, setTemp] = React.useState("Loading...");
  const [description, setDescription] = React.useState(null);
  const [maxTemp, setMaxTemp] = React.useState(null);
  const [minTemp, setMinTemp] = React.useState(null);
  const [sunrise, setSunrise] = React.useState(null);
  const [sunset, setSunset] = React.useState(null);
  const [feelsLike, setFeelsLike] = React.useState(null);
  const [wind, setWind] = React.useState(null);
  const [humidity, setHumidity] = React.useState(null);
  const [pressure, setPressure] = React.useState(null);

  React.useEffect(() => {
    setTemp("Loading...");
    fetch(url)
      .then((data) => data.json())
      .then((weather) => {
        //  Get user current City and State from api using GPS
        if (weather?.name && weather?.sys?.country) {
          setCity(weather.name);
          setState(weather?.sys?.country);
        } else setCity("Something went wrong");
        //  Weather Icon and Temperature 
			  if (weather?.weather[0]?.icon && weather?.main?.temp) {
          setTemp(weather.main.temp);
          setIcon(weather.weather[0].icon);
        } else setTemp("Error");
        //  Weather status 
			  if (weather?.weather[0]?.description) {
          setDescription(weather.weather[0].description);
        } else setDescription("Error");
        //  Maximun and Minimum temperature
			  if (weather?.main?.temp_max && weather?.main?.temp_min) {
          setMaxTemp(weather.main.temp_max);
          setMinTemp(weather.main.temp_min);
        } else setMaxMin("Error");
        //  Sunrise and Sunset time (UNIX timestamp)
			  if (weather?.sys?.sunrise && weather?.sys?.sunset) {
          setSunrise(new Date(weather.sys.sunrise * 1000).toLocaleTimeString());
          setSunset(new Date(weather.sys.sunset * 1000).toLocaleTimeString());
        } else setSunrise("Error");
        //  Weather real feeling temperature (° C )
			  if (weather?.main?.feels_like) {
          setFeelsLike(weather.main.feels_like);
        } else setFeelsLike("Error");
        //  Weather wind speed meter/second (m/s)
			  if (weather?.wind?.speed) {
          setWind(weather.wind.speed);
        } else setWind("Error");
        //  Weather humidity (%)
			  if (weather?.main?.humidity) {
          setHumidity(weather.main.humidity);
        } else setHumidity("Error");
        //  Atmospheric pressure (hPa)
			  if (weather?.main?.pressure) {
          setPressure(weather.main.pressure);
        } else setPressure("Error");

      });
  }, []);

  return (
    <>
	<Text style={styles.head}>Weather</Text>
    <ScrollView style={styles.scroll}>
		<Text style={styles.city}>{city}, {state}</Text>
        <Image style={styles.icon} source={{ uri: `http://openweathermap.org/img/wn/${icon}@2x.png` }} />
        <View>
            <Text style={styles.temp}>{temp}° C</Text>
        </View>
        <View>
            <Text style={styles.description}>{description} {'\n'}</Text>
        </View>

        <View style={styles.temp_sun}>
            <Text style={styles.max_min}>
                {minTemp}° C {' <- Min Temp Max -> '}{maxTemp}° C 
            </Text>
            <View style={styles.sunIcon}>
                <MaterialCommunityIcons name="weather-sunset-up" size={50} color='#FFCA7C' />
                <MaterialCommunityIcons name="weather-sunset" size={50} color='#FAD6A5' />
            </View>
            <View style={styles.sun}>
                <Text style={styles.item}>Sunrise: {sunrise}</Text>
                <Text style={styles.item}>Sunset: {sunset}</Text>
            </View>
        </View>

        <View style={styles.weatherDetails}>
            <View style={styles.detailsCol}>
                <View style={styles.detailsRow}>
                    <View style={styles.detailsBox}>
                        <FontAwesome5 name="temperature-low" size={25} color='#F00' />
                        <View style={styles.item}>
                        <Text>Real feel</Text> 
                        <Text>{feelsLike}° C</Text> 
                        </View>
                    </View>
                    <View style={styles.detailsBox}>
                        <MaterialCommunityIcons name="weather-windy" size={30} color='#F00' />
                        <View style={styles.item}>
                        <Text>Wind Speed</Text> 
                        <Text>{wind} m/s</Text> 
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.detailsCol}>
                <View style={styles.detailsRow}>
                    <View style={styles.detailsBox}>
                        <MaterialCommunityIcons name="water" size={30} color='#F00' />
                        <View style={styles.item}>
                        <Text>Humidity</Text> 
                        <Text>{humidity} %</Text> 
                        </View>
                    </View>
                    <View style={styles.detailsBox}>
                        <MaterialCommunityIcons name="speedometer" size={30} color='#F00' />
                        <View style={styles.item}>
                        <Text>Pressure</Text> 
                        <Text>{pressure} hPa</Text> 
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 15,
  },
  head: {
    backgroundColor: '#000080',
    width: '100%',
    height: 50,
    color: '#fff',
    textAlign: "center",
    fontSize: 30,
  },
  icon: {
    width: 150, 
    height: 150,
    alignSelf: 'center',
  },
  city: {
    padding: 10,
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
  },
  temp: {
    fontSize: 50,
    textAlign: 'center',
    color: '#fff',
  },
  description: {
    fontSize:15,
    textTransform: 'capitalize',
    margin: 5,
    textAlign: 'center',
    color: '#fff',
  },
  temp_sun: {
    backgroundColor: '#00BFFF',
    padding: 14,
    borderRadius: 20,
    marginBottom: 25,
    color: '#fff',
    fontSize: 15,
  },
  max_min: {
    padding: 15,
    textAlign: 'center',
    color: '#fff',
  },
  sunIcon: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sun: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  weatherDetails: {
    backgroundColor: '#00BFFF',
    padding: 10,
    borderRadius: 20,
    marginBottom: 50,
  },
  detailsCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsRow: {
    flexDirection: 'row',
  },
  detailsBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    margin: 5,
    padding:15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    color: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

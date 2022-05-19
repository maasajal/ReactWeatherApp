import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from "expo-location";
// import Orientation
import Orientation from 'react-native-orientation';
import Weather from "./components/WeatherApp";

export default function App() {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

useEffect(() => {
	(async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
		setErrorMsg("Permission to access location was denied");
		return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
	})();
	}, []);

	let text = "Loading...";
	if (errorMsg) {
	  	text = errorMsg;
	} else if (location) {
	  	text = JSON.stringify(location);
	}

	const longitude = location?.coords?.longitude;
	const latitude = location?.coords?.latitude;

	if (!longitude || !latitude) {
		return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>{text}</Text>
			<StatusBar style="auto" />
		</View>
		);
	}

	return (
		<View style={styles.container}>
			<Weather lat={latitude} lon={longitude} />
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
},
paragraph: {
	margin: 150,
},
});

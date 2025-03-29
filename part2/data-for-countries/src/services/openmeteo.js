import Axios from 'axios'

const baseUrl = 'https://api.open-meteo.com/v1/forecast'
const params = 'current=temperature_2m,is_day,weather_code,cloud_cover,pressure_msl,surface_pressure,apparent_temperature,relative_humidity_2m,precipitation,rain,showers,snowfall,wind_speed_10m,wind_direction_10m,wind_gusts_10m';

const fetch = async (latitude, longitude) => {
	const queryString = `?latitude=${latitude}&longitude=${longitude}&${params}`;
	const apiUrl = `${baseUrl}${queryString}`;

	return Axios
		.get(apiUrl)
		.then((response) => response.data.current)
		.catch((error) => {
			alert(`OpenMeteo API Failed to fetch lat:${latitude} long:${longitude}`);
			console.log(error);
			return error;
		});
};

export default {fetch};

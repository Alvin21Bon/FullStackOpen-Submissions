import { useState, useEffect } from 'react'

import OpenMeteo from '../services/openmeteo.js'

const CountryView = ({country}) => {
	const [weatherInfo, setWeatherInfo] = useState(null);

	useEffect(() => {
		const latlng = country.capitalInfo.latlng;
		OpenMeteo
			.fetch(latlng[0], latlng[1])
			.then((weatherInfo) => setWeatherInfo(weatherInfo))
	}, [country]);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>{country.flag}</div>
			<div>
				<p>Capital: {country.capital}</p>
				<p>Area Code: {country.area}</p>
			</div>
			<h2>Languages Spoken</h2>
			<div>
				<ul>
					{Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
				</ul>
			</div>

			<div>
				<h2>Weather in {country.capital}</h2>
				<div>
					<p>Temperature: {weatherInfo != null ? weatherInfo.temperature_2m : null} Celcius</p>
					<p>Wind Speeds: {weatherInfo != null ? weatherInfo.wind_speed_10m : null} km/h</p>
				</div>
			</div>
		</div>
	);
}

export default CountryView

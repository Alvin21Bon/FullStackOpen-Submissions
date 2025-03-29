import { useState, useEffect } from 'react'

import SearchField from './components/SearchField'
import SearchResults from './components/SearchResults'

import CountriesAPI from './services/countries.js'

const App = () => {
	const [countries, setCountries] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		CountriesAPI
			.fetchAll()
			.then((data) => setCountries(data))
	}, [])

	const handleKeystroke = (event) => {
		const searchText = event.target.value;
		const searchRegex = new RegExp(searchText, 'i');
		setSearchText(searchText);
		setSearchResults(countries.filter((country) => searchRegex.test(country.name.common) || searchRegex.test(country.name.official)));
	}
	const handleViewButtonPress = (countryName) => {
		const country = countries.find((country) => country.name.common === countryName || country.name.official === countryName);
		return () => setSearchResults([country]);
	}

	return (
		<div>
			<SearchField label='Country Name' value={searchText} onKeystroke={handleKeystroke} />
			<SearchResults countries={searchResults} onView={handleViewButtonPress}/>
		</div>
	);
}

export default App;

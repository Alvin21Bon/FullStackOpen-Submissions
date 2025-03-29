import Axios from 'axios'

const fetchUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const baseCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name';

const fetchAll = async () => {
	return Axios
		.get(fetchUrl)
		.then((response) => response.data)
		.catch((error) => {
			alert("CountriesAPI fetchALL error");
			console.log(error);
			return error;
		});
};

const fetch = async (countryName) => {
	return Axios
		.get(`${baseCountryUrl}/${countryName}`)
		.then((response) => response.data)
		.catch((error) => {
			alert(`CountriesAPI failed to fetch ${countryName}`);
			console.log(error);
			return error
		});
};

export default {fetchAll, fetch};

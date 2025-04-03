import Axios from 'axios'

const baseUrl = '/api/persons';

const fetch = async () => {
	return Axios
		.get(baseUrl)
		.then((response) => response.data)
		.catch((error) => Promise.reject(error.response.data));
};

const addPerson = async (person) => {
	return Axios
		.post(baseUrl, person)
		.then((response) => response.data)
		.catch((error) => Promise.reject(error.response.data));
};

const modifyPerson = async (id, newPerson) => {
	return Axios
		.put(`${baseUrl}/${id}`, newPerson)
		.then((response) => response.data)
		.catch((error) => Promise.reject(error.response.data));
};

const deletePerson = async (id) => {
	return Axios
		.delete(`${baseUrl}/${id}`)
		.then((response) => response.data)
		.catch((error) => Promise.reject(error.response.data));
};

export default {fetch, addPerson, modifyPerson, deletePerson};

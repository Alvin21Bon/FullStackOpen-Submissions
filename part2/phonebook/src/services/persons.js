import Axios from 'axios'

const baseUrl = 'http://localhost:3001/persons';

const fetch = async () => {
	return Axios
		.get(baseUrl)
		.then((response) => response.data);
};

const addPerson = async (person) => {
	return Axios
		.post(baseUrl, person)
		.then((response) => response.data);
};

const modifyPerson = async (id, newPerson) => {
	return Axios
		.put(`${baseUrl}/${id}`, newPerson)
		.then((response) => response.data);
};

const deletePerson = async (id) => {
	return Axios
		.delete(`${baseUrl}/${id}`)
		.then((response) => response.data);
};

export default {fetch, addPerson, modifyPerson, deletePerson};

import Input from './UserInput'
import CountryView from './CountryView'

const SearchResultsEntry = ({country, onView}) => 
	<Input label={country.name.common} type='button' value='show' onClick={onView(country.name.common)} />

const SearchResults = ({countries, onView}) => {
	if (countries.length > 10)
	{
		return (
			<div>
				<p>Too many matches. Specify a specific search</p>
			</div>
		);
	}
	if (countries.length === 0 || countries == undefined)
	{
		return (
			<div>
				<p>No matches found</p>
			</div>
		);
	}
	if (countries.length === 1) return <CountryView country={countries[0]} />;

	return (
		<div>
			{countries.map((country) => 
				<SearchResultsEntry 
					key={country.name.official} 
					country={country} 
					onView={onView} 
				/>)}
		</div>
	);
}

export default SearchResults;

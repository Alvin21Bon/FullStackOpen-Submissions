import Input from './UserInput'

const SearchField = ({label, value, onKeystroke}) => <Input label={label} type='text' value={value} onChange={onKeystroke} />

export default SearchField;

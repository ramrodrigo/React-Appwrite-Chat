export default function capFirstLetter(word) {
	if (!word) return ''; // Return an empty string if the input is empty
	return word.charAt(0).toUpperCase() + word.slice(1);
}

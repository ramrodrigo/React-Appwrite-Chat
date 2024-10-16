import { encrypt, decrypt } from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';
import localforage from 'localforage';

// Retrieve the encryption key from environment variables
const key = import.meta.env.VITE_KEY;

// Function to encrypt data and store it in localForage
export const encryptData = async (data) => {
	if (!data) {
		console.error('No data provided for encryption.');
		return;
	}
	try {
		// Encrypt the data and convert it to a string
		const encryptedData = encrypt(JSON.stringify(data), key).toString();
		// Store the encrypted data in localForage
		await localforage.setItem('userData', encryptedData);
	} catch (error) {
		console.error('Error encrypting data:', error);
	}
};

// Function to decrypt data from localForage
export const decryptData = async () => {
	try {
		// Retrieve the encrypted data from localForage
		const storedData = await localforage.getItem('userData');

		if (!storedData) {
			console.error('No data found in localForage.');
			return null; // Return null if no data is found
		}

		// Decrypt the data and parse it to JSON
		return JSON.parse(decrypt(storedData, key).toString(enc.Utf8));
	} catch (error) {
		console.error('Error decrypting data:', error);
		return null; // Return null if decryption fails
	}
};

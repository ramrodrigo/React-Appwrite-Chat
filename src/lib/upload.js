import { ID } from 'appwrite';
import { storage } from './appwrite';
import { toast } from 'react-toastify';
import fileUrl from './fileUrl';

const BUCKET = import.meta.env.VITE_CHAT_BUCKET;

const uploadFile = async () => {
	const fileInput = document.getElementById('uploader');
	const file = fileInput?.files[0];

	if (!file) {
		toast.error('No file selected!');
		return;
	}

	try {
		const response = await storage.createFile(BUCKET, ID.unique(), file);
		toast.success('File uploaded!');
		console.log(response.$id); // Log the unique ID of the uploaded file
		return fileUrl(response.$id); // Return the file URL
		// console.log(fileUrl(response.$id));
	} catch (error) {
		toast.error('File upload failed!');
		console.error(error); // Failure
	}
};

export default uploadFile;

//https://cloud.appwrite.io/v1/storage/buckets/67079a6b00148ec37b43/files/670916c300170918ea73/view?project=670789ad003da11e2fa4&project=670789ad003da11e2fa4&mode=admin

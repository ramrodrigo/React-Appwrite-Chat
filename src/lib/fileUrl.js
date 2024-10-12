const fileUrl = (fileId) => {
	return `https://cloud.appwrite.io/v1/storage/buckets/${
		import.meta.env.VITE_CHAT_BUCKET
	}/files/${fileId}/view?project=${import.meta.env.VITE_PROJECT_ID}&project=${
		import.meta.env.VITE_PROJECT_ID
	}&mode=admin`;
};

export default fileUrl;

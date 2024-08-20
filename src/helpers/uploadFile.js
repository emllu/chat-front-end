const uploadFile = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append("upload_preset", "chat-app-file");

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    
    // Ensure the correct field is returned from Cloudinary
    return responseData; // assuming Cloudinary returns 'secure_url'
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
module.exports=uploadFile
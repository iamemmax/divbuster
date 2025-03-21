import crypto from 'crypto'; // Import the crypto module for generating the signature
import axios from 'axios';

const apiSecret = process.env.NEXT_PUBLIC_CLOUDINERY_API_SECRETE;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const uploadToCloudinary = async (
    file: File | string,
    // folder: string = 'default_folder' // You can specify the folder name here, default is 'default_folder'
): Promise<{ id: string; secure_url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'liberty'); // Replace 'liberty' with your Cloudinary upload preset
    formData.append('folder', "liberty-life"); // Specify the folder where the image will be uploaded

    try {
        const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        );

        return { id: data?.public_id, secure_url: data?.secure_url };
    } catch (error) {
        // console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload file to Cloudinary');
    }
};

export const generateSignature = (publicId: string) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signaturePayload = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
        .createHash('sha1')
        .update(signaturePayload)
        .digest('hex');

    return {
        signature,
        timestamp,
    };
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
    try {
        const { signature, timestamp } = generateSignature(publicId);

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
            {
                public_id: publicId,
                api_key: process.env.NEXT_PUBLIC_CLOUDINERY_API_KEY,
                timestamp,
                signature,
            }
        );

        return response.data; // Return any response data if needed
    } catch (error) {
        // console.error('Error deleting file from Cloudinary:', error);
        throw new Error('Failed to delete file from Cloudinary');
    }
};

import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface UpdateImageOrVideoProps {
    id: string;
    show_map_first: boolean;
    dive_photos: File[];
}



// const updatImageOrVideo = async ({ id, show_map_first, dive_photos }: UpdateImageOrVideoProps) => {
//     const formData = new FormData();
//     formData.append("show_map_first", String(show_map_first));
    
//     if (dive_photos?.length > 0) {
//         dive_photos.forEach((file) => {
//             formData.append("dive_photos", file);
//         });
//     }
    
//     const response = await adminAxios.put(`/dive/dive-log/${id}/edit`, formData);
//     return response.data;
// };

const updatImageOrVideo = async ({ id, dive_photos }: UpdateImageOrVideoProps) => {
    const formData = new FormData();

    // Required fields
    formData.append("dive_log_id", String(id));
    formData.append("lang", "en"); // or dynamic

    const images: File[] = [];
    const videos: File[] = [];

    if (dive_photos?.length > 0) {
        dive_photos.forEach((file) => {
            if (file.type.startsWith("image/")) {
                images.push(file);
            } else if (file.type.startsWith("video/")) {
                videos.push(file);
            }
        });
    }

    // Append separately so backend can parse arrays
    images.forEach((file) => formData.append("image", file));
    videos.forEach((file) => formData.append("video", file));

    const response = await adminAxios.post  (`/divelog/photo/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};



export const useUpdatImageOrVideo = () => {
    return useMutation({
        mutationFn: updatImageOrVideo,
    });
};
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FaceSuccess() {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const fetchFaceImage = async () => {
  //     try {
  //       const faceUrl =
  //         "http://192.168.88.143/LOCALS/pic/enrlFace/0/0000000002.jpg";

  //       const res = await axios.get(
  //         "http://localhost:5000/employee/face-image",
  //         {
  //           params: { url: faceUrl },
  //           responseType: "blob", // 🔴 ENG MUHIM JOY
  //         },
  //       );

  //       // blob → browser usable URL
  //       const blobUrl = URL.createObjectURL(res.data);
  //       setImageUrl(blobUrl);
  //     } catch (err) {
  //       console.error("Face image load failed", err);
  //       setError(true);
  //     }
  //   };

  //   fetchFaceImage();

  //   // cleanup (memory leak bo‘lmasin)
  //   return () => {
  //     if (imageUrl) {
  //       URL.revokeObjectURL(imageUrl);
  //     }
  //   };
  // }, []);

  return (
    <div className="bg-white rounded-3xl mt-5 flex justify-between items-center p-5 px-10">
      <div className="flex gap-5 items-center">
        <div className="h-25 w-25 rounded-full border-3 border-purple overflow-hidden flex items-center justify-center">
          {imageUrl && !error ? (
            <img
              src={imageUrl}
              alt="face"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="text-sm text-gray-400">No Image</div>
          )}
        </div>

        <div>
          <h1 className="font-bold">Muxammed</h1>
          <p>ID: JTSB</p>
          <p>Bo‘lim: JXX</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <CheckCircleOutlineIcon fontSize="large" style={{ color: "#37BC8F" }} />
        <p>Present</p>
      </div>
    </div>
  );
}

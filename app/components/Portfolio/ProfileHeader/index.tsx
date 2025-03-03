import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { updateByIdportfolio, getByIdportfolio } from "@/app/redux/features/portfolio";
import Image from "next/image";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/cropImage";
import { useState, useCallback, useEffect } from "react";
import { Pencil, Plus, Star } from "lucide-react";

import styles from "./index.module.css";

interface ProfileHeaderProps {
  id: string;
  name: string;
  coverImageUrl: string;
  profileImageUrl: string;
}

export default function ProfileHeader({ 
  // id,
  name, 
  coverImageUrl, 
  profileImageUrl 
}: ProfileHeaderProps) {

  const dispatch = useDispatch<AppDispatch>();
  const participantId = "67ab65b24cb48a7c886d0dfa";

  const [showModal, setShowModal] = useState(false);
  const [uploadType, setUploadType] = useState<"profile" | "background">();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null) ;

  const [updatedProfileImageUrl, setUpdatedProfileImageUrl] = useState(profileImageUrl || "/pro.png");
  const [updatedCoverImageUrl, setUpdatedCoverImageUrl] = useState(coverImageUrl || "/pbg.png");

  const handleOpenModal = (type: "profile" | "background") => {
    setUploadType(type);
    setShowModal(true);
    setSelectedImage(null);
  };

  useEffect(() => {
    console.log("showModal state:", showModal);
  }, [showModal]);

  type CroppedArea = {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  
  // const onCropComplete = useCallback((_: any, croppedAreaPixels: CroppedArea) => {
  //   setCroppedAreaPixels(croppedAreaPixels);
  // }, []);

  const onCropComplete = useCallback((_croppedArea: { x: number; y: number; width: number ; height: number},croppedAreaPixels: CroppedArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  },[]);


  useEffect(() => {
    console.log("Selected Image:", selectedImage);
  }, [selectedImage]);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("File selected:", file.name);

    const reader = new FileReader();
    reader.onload = () => {
      console.log("Base64 Image Data:", reader.result );
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCroppedImage = async () => {
    if (!selectedImage || !croppedAreaPixels || !uploadType) return;

    console.log("Cropping Image..." );

    

    const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
    if (!croppedImage) {
      console.error("Cropped image is null!");
      return;
    } 

   



    

    // ✅ Convert Blob to File
    const file = new File([croppedImage], "cropped-image.png", { type: "image/png" });

    console.log("Checking uploaded file:", file); // ✅ Debug log to check if the file is valid

    const formData = new FormData();
    // formData.append(uploadType === "profile" ? "profile_image" : "Background_image", croppedImage);
    formData.append(uploadType === "profile" ? "profile_image" : "Background_image", file);


    console.log("FormData entries:", Array.from(formData.entries()));

        // ✅ Log what is actually sent
      // console.log("FormData entries:");
      //console.log("FormData entries:", Array.from(formData.entries()));
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }


    console.log("Uploading image...");

    try {
      // Fetch the latest portfolio data before updating
      console.log("Fetching current portfolio data...");
      // await dispatch(getByIdportfolio({ participantId: id })).unwrap();
      await dispatch(getByIdportfolio({ participantId })).unwrap();


      console.log("Uploading image..." )
      const response = await dispatch(updateByIdportfolio({ formData })).unwrap();

      console.log("Uplaod response :", response);
      

      if (uploadType === "profile") {
        setUpdatedProfileImageUrl((prev) => {
          console.log("Previous Profile Image:", prev, "New:", response.profile_image_url);
          return response.profile_image_url;
        });
      } else {
        setUpdatedCoverImageUrl((prev) => {
          console.log("Previous Cover Image:", prev, "New:", response.Background_image_url);
          return response.Background_image_url;
        });
      }

      setShowModal(false);

      // Fetch updated portfolio data after updating
      console.log("Fetching updated portfolio data...");
      // await dispatch(getByIdportfolio({ participantId: id })).unwrap();
      await dispatch(getByIdportfolio({ participantId })).unwrap();

    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const [totalReviews/*,setTotalReviews*/] = useState(1); 

 

  const //rating = 4,
  fullStarColor = 'yellow', // Customizable full star color
  emptyStarColor = 'gray',  // Customizable empty star color
    //reviewCountColor = 'yellow', // Customizable review count color
  colour= 'yellow'

  const fullStars = /*Math.floor(rating) */3;
  const hasHalfStar = /*rating % 1 >= 0.5 */ true;

  return (
    <div>
      {/* Cover Photo */}
      <div className={styles.background_image}>
        <Image src={updatedCoverImageUrl} alt="Cover image" width={1540} height={350} />
        <button onClick={() => handleOpenModal("background")} className={styles.background_pencil}>
          <Pencil size={30} color="black" />
        </button>
      </div>

      {/* Profile Image */}
      <div className={styles.photographer_profilePic_info}>
        <Image 
        src={updatedProfileImageUrl} 
        alt="Profile image" 
        height={250} 
        width={240} 
        // className="rounded-full object-cover w-full h-full" 
        className={styles.profileImage}  />
       
        <button onClick={() => handleOpenModal("profile")} className={styles.profile_editor}>
          <Plus size={40} color="black" />
        </button>
      </div>

      {/* Modal for Image Cropping */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h2>Edit {uploadType} Image</h2>

            {/* Hidden File Input */}
            <input 
              type="file" 
              accept="image/*" 
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* Button to Trigger File Input */}
            <button onClick={() => document.getElementById("fileInput")?.click()}>
              Select Image
            </button>

            {/* Show Cropper Only If Image Is Selected */}
            {selectedImage ? (
              <div className={styles.crop_container}>
                <Cropper 
                  image={selectedImage} 
                  crop={crop} 
                  zoom={zoom} 
                  aspect={uploadType === "profile" ? 1 : 3} 
                  onCropChange={setCrop} 
                  onZoomChange={setZoom} 
                  onCropComplete={onCropComplete} 
                />
              </div>
            ) : (
              <p style={{ color: "red" }}>No image selected</p>
            )}

            {/* Zoom Control */}
            <input 
              type="range" 
              min={1} 
              max={3} 
              step={0.1} 
              value={zoom} 
              onChange={(e) => setZoom(Number(e.target.value))} 
            />

            {/* Save and Close Buttons */}
            <button onClick={handleSaveCroppedImage}>Save Photo</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      <div className= {styles.photographer_info} >
            <h1>{name} </h1>
           
      </div>
      <div className= {styles.rate} >
      
        <ul className={styles.list}>
        <li>{[...Array(5)].map((_, index) => (
          <span 
            key={index}
            className={` ${
              index < fullStars 
                ?  fullStarColor 
                : index === fullStars && hasHalfStar 
                ? emptyStarColor
                : fullStarColor
            }` }
          >
            <Star size={20} color={colour} fill={colour}/>
          </span>
        ))}
        {totalReviews > 0 && (
        <span className={styles.review }  >
          ({totalReviews.toLocaleString()})
        </span>

    )}
        

        </li>

      </ul>
      
    </div>
    </div>
  );
}

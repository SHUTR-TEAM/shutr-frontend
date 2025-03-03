const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous"; // Prevent CORS issues
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  
  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
//   ): Promise<string> => {
): Promise<File> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    if (!ctx) {
      throw new Error("Canvas rendering context not supported");
    }
  
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    // return new Promise((resolve) => {
    //   canvas.toBlob((blob) => {
    //     if (blob) {
    //       resolve(URL.createObjectURL(blob));
    //     }
    //   }, "image/jpeg");
    // });

    return new Promise<File>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Failed to create Blob");
            return reject(null);
          }
          // ✅ Convert Blob to File
          const file = new File([blob], "cropped-image.png", { type: "image/png" });
          resolve(file);
        }, "image/png");
      });
  };
  
  export default getCroppedImg;
  
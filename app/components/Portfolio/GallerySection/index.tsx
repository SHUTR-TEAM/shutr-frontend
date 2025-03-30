import Image from "next/image";
import React, { useMemo, useEffect, useState } from "react";
import styles from "./index.module.css";
import {
  X,
  Plus,
  Trash2,
  Upload,
  ChevronLeft,
  ChevronRight,
  ImageOff,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import {
  getByIdgallery,
  postGallery,
  deleteImage,
} from "@/app/redux/features/portfolio";
import { useRef } from "react";
import { cn } from "../../../utils/Category-basedNav";
import { LoadingSpinner } from "../LoadingSpinner";
import { usePathname } from "next/navigation";

export default function GallerySection({
  photographerId,
}: {
  photographerId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const participantId = pathname.split("/").pop();

  // const user = useSelector((state: RootState) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);
  const [isUpLoading, setIsUpLoading] = useState(false);

  useEffect(() => {
    if (participantId) {
      setIsLoading(true); // Show loading before fetching
      dispatch(getByIdgallery({ participantId: participantId }))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false)); // Stop loading on error too
    }
  }, [dispatch, participantId]);

  const activeGallery = useSelector(
    (state: RootState) => state.portfolio.activeGallery
  ) || { results: [] };

  const Gallery = useMemo(
    () => activeGallery?.data ?? [],
    [activeGallery?.data]
  );

  // const participantId = "67db026680a585e2d2cd7439";

  const imagesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("add");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageCategory, setNewImageCategory] = useState("");
  const [previewImages, setPreviewImages] = useState<
    { url: string; file?: File; category?: string }[]
  >([]);

  const [localGallery, setLocalGallery] = useState(Gallery);

  const isInitialized = useRef(false); // tracks initialization

  useEffect(() => {
    if (!isInitialized.current && Gallery && Gallery.length > 0) {
      setLocalGallery(Gallery);
      isInitialized.current = true; // prevent future resets
    }
  }, [Gallery]);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredPhotos = !Gallery
    ? []
    : selectedCategory === "All"
    ? Gallery
    : Gallery.filter(
        (photo) =>
          photo.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  const totalPages = Math.ceil(filteredPhotos.length / imagesPerPage);

  const currentImages = filteredPhotos.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const uniqueCategories =
    Gallery.length > 0
      ? [
          "All",
          ...Array.from(
            new Set(Gallery.map((photo) => photo.category).filter(Boolean))
          ),
        ]
      : [];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    console.log("close window is working");
    setIsModalOpen(false);
    setPreviewImages([]);
    setNewImageUrl("");
    setNewImageCategory("");
    if (participantId) {
      await dispatch(getByIdgallery({ participantId })).unwrap();
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImages((prev) => [
            ...prev,
            {
              url: reader.result as string,
              file,
              category: newImageCategory || "", // Assign category immediately if available
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  useEffect(() => {
    if (newImageCategory.trim() !== "") {
      setPreviewImages((prev) =>
        prev.map((img) => ({
          ...img,
          category: newImageCategory, // Update category for all images
        }))
      );
    }
  }, [newImageCategory]);

  const handleRemovePreview = (index: number) => {
    const newPreviewImages = [...previewImages];
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviewImages[index].url);
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  const handleAddImages = async () => {
    if (previewImages.length === 0) return;

    const formData = new FormData();

    // Append each image and its category to FormData
    if (participantId) {
      previewImages.forEach(({ file, category }) => {
        if (file) {
          formData.append("image", file);
          formData.append("category", category || "Uncategorized"); // Default category if empty
          formData.append("photographerID", photographerId);
          formData.append("portfolioID", participantId);
        }
      });
    }

    try {
      setIsUpLoading(true); // Start upload loading
      await dispatch(postGallery({ formData })).unwrap();

      setSelectedCategory("All");
      isInitialized.current = false;

      closeModal();

      if (participantId) {
        await dispatch(getByIdgallery({ participantId })).unwrap();
      }
    } catch (error) {
      console.log("Upload failed:", error);
    } finally {
      setIsUpLoading(false);
    }
  };

  const handleDeleteImage = async (indices: number | number[]) => {
    // Ensure indices is always an array
    const indexArray = Array.isArray(indices) ? indices : [indices];
    const imagesToDelete = indexArray
      .map((index) => localGallery[index]?.url)
      .filter(Boolean);

    for (const imageUrl of imagesToDelete) {
      try {
        if (participantId) {
          await dispatch(deleteImage({ participantId, imageUrl })).unwrap();
        }
        setLocalGallery((prevGallery) =>
          prevGallery.filter((img) => img.url !== imageUrl)
        );
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  // Image viewer functions
  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setViewerOpen(true);
  };

  const closeImageViewer = () => {
    setViewerOpen(false);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? filteredPhotos.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === filteredPhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPreviousImage();
    } else if (e.key === "ArrowRight") {
      goToNextImage();
    } else if (e.key === "Escape") {
      closeImageViewer();
    }
  };

  //Categories-based button nav
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      // Show left arrow if we're not at the start
      setShowLeftArrow(scrollLeft > 0);

      // Show right arrow if we haven't scrolled to the end
      // Add a small buffer (1px) to account for rounding errors
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      // Check initial scroll position
      checkScrollPosition();

      // Check again after a short delay to account for any layout shifts
      const timeoutId = setTimeout(checkScrollPosition, 100);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <section className={styles.gallery}>
      <div className={styles.gallery_edit_container}>
        <h2>Gallery</h2>
        {user?.role == "photographer" && user.portfolio.id == participantId && (
          <button onClick={openModal} className={styles.edit_button}>
            <Plus size={18} /> Edit Gallery
          </button>
        )}
      </div>

      {/* this is where button nav is located */}

      <div className={styles.mainContainer}>
        <div className={styles.wrapper}>
          <div className={styles.scrollWrapper}>
            {showLeftArrow && (
              <div className={styles.arrowLeft}>
                <button
                  onClick={() => scroll("left")}
                  className={styles.arrowButton}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className={styles.icon} />
                </button>
              </div>
            )}

            <div ref={scrollContainerRef} className={styles.scrollContainer}>
              <div className={styles.buttonContainer}>
                {uniqueCategories && uniqueCategories.length > 0 ? (
                  uniqueCategories.map((category) => (
                    <button
                      key={category}
                      className={cn(
                        styles.button,
                        selectedCategory === category
                          ? styles.activeButton
                          : styles.notActiveButton
                      )}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))
                ) : (
                  <br />
                )}
              </div>
            </div>

            {showRightArrow && (
              <div className={styles.arrowRight}>
                <button
                  onClick={() => scroll("right")}
                  className={styles.arrowButton}
                  aria-label="Scroll right"
                >
                  <ChevronRight className={styles.icon} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.gallery_grid}>
        {isLoading || isUpLoading ? (
          <div className={styles.loading}>
            <LoadingSpinner />
          </div>
        ) : currentImages && currentImages.length > 0 ? (
          currentImages.map((photo, index) => (
            <div
              key={index}
              className={styles.imageView}
              onClick={() =>
                openImageViewer(currentPage * imagesPerPage + index)
              }
            >
              <Image
                src={photo.url}
                alt={`Gallery item ${index + 1}`}
                width={390}
                height={390}
                className={styles.image}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.imageOpacity}>
                  <span className={styles.imageBadge}>{photo.category}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className={styles.container}>
              <div className={styles.innerContainer}>
                <div className={styles.imageWrapper}>
                  <div className={styles.iconContainer}>
                    <ImageOff size={190} />
                  </div>
                  <div className={styles.gradientOverlay} />
                </div>
                <h3 className={styles.heading}>No photos available yet</h3>
              </div>
            </div>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationDots}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={index === currentPage ? styles.activeDot : styles.dot}
              onClick={() => handlePageChange(index)}
              aria-label={`Go to page ${index + 1}`}
            ></button>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>Edit Gallery</h3>
              <button onClick={closeModal} className={styles.modelCloseButton}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.sections}>
              <button
                className={`${styles.sectionsButton} ${
                  activeTab === "add" ? styles.select : styles.notSelect
                }`}
                onClick={() => handleTabChange("add")}
              >
                Add Images
              </button>
              <button
                className={`${styles.sectionsButton} ${
                  activeTab === "delete" ? styles.select : styles.notSelect
                }`}
                onClick={() => handleTabChange("delete")}
              >
                Delete Images
              </button>
            </div>

            <div className={styles.activeTab}>
              {activeTab === "add" && (
                <div>
                  <div className={styles.imageUploadSection}>
                    <label className={styles.imageUploadLabel}>
                      Upload Images
                    </label>

                    <div className={styles.imageInput}>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.imageInputIcon}
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className={styles.fileUpload}
                      >
                        <div className={styles.itemUpload}>
                          <Upload className={styles.uploadIcon} size={36} />
                          <p className={styles.uploadText}>
                            click to browse{" "}
                            {/* Drag and drop files here or  click to browse*/}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {previewImages.length > 0 && (
                    <div className={styles.prevImage}>
                      <h4 className={styles.preview}>Preview</h4>

                      <div className={styles.prevGrid}>
                        {previewImages.map((preview, index) => (
                          <div key={index} className={styles.prevImageIndex}>
                            <Image
                              src={preview.url}
                              alt={`Preview ${index + 1}`}
                              width={40}
                              height={40}
                              className={styles.imagePrev}
                            />
                            <button
                              onClick={() => handleRemovePreview(index)}
                              className={styles.prevCloseButton}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.categoryInputContainer}>
                    <label className={styles.categoryInputLabel}>
                      Category
                    </label>
                    <input
                      type="text"
                      value={newImageCategory}
                      onChange={(e) => setNewImageCategory(e.target.value)}
                      placeholder="Enter category (e.g., Nature, Wedding)"
                      className={styles.categoryInput}
                    />
                  </div>

                  <div className={styles.categoryInputButtonContainer}>
                    <button
                      onClick={handleAddImages}
                      className={styles.categoryInputButton}
                      disabled={
                        (!newImageUrl && previewImages.length === 0) ||
                        !newImageCategory
                      }
                    >
                      Add to Gallery
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "delete" && (
                <div>
                  {localGallery.length === 0 ? (
                    <p className={styles.emptyImageLabel}>
                      No images in the gallery
                    </p>
                  ) : (
                    <div>
                      <h4 className={styles.deleteLabelSelect}>
                        Select images to delete
                      </h4>
                      <div className={styles.deleteGrid}>
                        {localGallery.map((photo, index) => (
                          <div key={index} className={styles.group}>
                            <Image
                              src={photo.url}
                              alt={`Gallery item ${index + 1}`}
                              width={200}
                              height={20}
                              className={styles.deleteImage}
                            />

                            <div className={styles.deleteContainer}>
                              <button
                                onClick={() => handleDeleteImage(index)}
                                className={styles.deleteButton}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>

                            <span className={styles.deleteImageCategory}>
                              {photo.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {viewerOpen && filteredPhotos.length > 0 && (
        <div
          className={styles.imageViewerOverlay}
          onClick={closeImageViewer}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className={styles.imageViewerContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageViewer}
              className={styles.imageViewerClose}
              aria-label="Close image viewer"
            >
              <X size={32} />
            </button>

            <div className={styles.imageViewerContent}>
              <Image
                src={filteredPhotos[currentImageIndex].url}
                alt={`Gallery image ${currentImageIndex + 1}`}
                width={1000}
                height={1000}
                className={styles.imageViewerImage}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPreviousImage();
                }}
                className={styles.previousButton}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
                className={styles.nextButton}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className={styles.imageViewerCaption}>
              <p className={styles.imageViewerCaptionPTag}>
                {filteredPhotos[currentImageIndex].category} • Image{" "}
                {currentImageIndex + 1} of {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

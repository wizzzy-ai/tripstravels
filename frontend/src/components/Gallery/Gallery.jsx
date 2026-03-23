import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Modal from "react-modal";
import { X, ZoomIn, Download, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Img01 from "../../assets/images/hero-img01.jpg";
import Img02 from "../../assets/images/hero-img02.jpg";
import Img03 from "../../assets/images/front-02.jpg";
import Img04 from "../../assets/images/gallery-04.jpg";
import Img06 from "../../assets/images/gallery-03.jpg";
import Img07 from "../../assets/images/gallery-08.jpg";
import Img08 from "../../assets/images/gallery-02.jpg";
import Img09 from "../../assets/images/gallery-01.jpg";

const ImagesGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLiked, setIsLiked] = useState({});

  const Images = [Img01, Img02, Img03, Img06, Img04, Img07, Img08, Img09];

  const openModal = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % Images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + Images.length) % Images.length);
  };

  const toggleLike = (index) => {
    setIsLiked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'relative',
      inset: 'auto',
      border: 'none',
      background: 'transparent',
      padding: 0,
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'visible',
    },
  };

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 992: 3, 1200: 4 }}>
        <Masonry gutter="1rem">
          {Images.map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => openModal(index)}
            >
              <img
                src={item}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                alt={`Gallery ${index + 1}`}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(index);
                        }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Heart 
                          size={20} 
                          className={`${isLiked[index] ? 'fill-red-500 text-red-500' : 'text-white'} transition-colors`}
                          strokeWidth={2}
                        />
                      </button>
                      <span className="text-white font-semibold">Image {index + 1}</span>
                    </div>
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <ZoomIn size={20} className="text-white" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* Professional Modal */}
      <Modal
        isOpen={selectedImage !== null}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        contentLabel="Image Preview"
      >
        {selectedImage !== null && (
          <div className="relative flex items-center justify-center">
            {/* Main Image */}
            <img
              src={Images[selectedImage]}
              alt="Full Preview"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
            />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 group"
              title="Close"
            >
              <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300"
              title="Previous"
            >
              <ChevronLeft size={28} className="text-white" strokeWidth={2.5} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300"
              title="Next"
            >
              <ChevronRight size={28} className="text-white" strokeWidth={2.5} />
            </button>

            {/* Image Info & Actions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 flex items-center gap-4">
              <span className="text-white font-semibold">
                {selectedImage + 1} / {Images.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(selectedImage);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Like"
                >
                  <Heart 
                    size={20} 
                    className={`${isLiked[selectedImage] ? 'fill-red-500 text-red-500' : 'text-white'}`}
                    strokeWidth={2}
                  />
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 size={20} className="text-white" strokeWidth={2} />
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download size={20} className="text-white" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImagesGallery;

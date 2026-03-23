import React, { useState, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';
import {
  MapPin,
  DollarSign,
  Users,
  FileText,
  Image as ImageIcon,
  Navigation,
  Star,
  Loader2,
  CheckCircle,
  Upload,
  X
} from 'lucide-react';

const CreateTours = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    desc: '',
    address: '',
    price: 0,
    maxGroupSize: 1,
    photo: '',
    distance: 0,
    featured: false,
    location: {
      lat: 0,
      lng: 0
    }
  });

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'lat' || name === 'lng') {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: parseFloat(value) || 0
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'location') {
          formDataToSend.append('location', JSON.stringify(formData.location));
        } else if (key !== 'photo' || !selectedFile) {
          // Only add photo URL if no file is selected
          if (key !== 'photo' || !selectedFile) {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // Add the selected file if it exists, otherwise use URL
      if (selectedFile) {
        formDataToSend.append('photo', selectedFile);
      } else if (formData.photo) {
        // Normalize photo URL: allow users to paste URLs without protocol
        let photoUrl = formData.photo;
        if (photoUrl && !/^https?:\/\//i.test(photoUrl)) {
          photoUrl = `https://${photoUrl}`;
        }
        formDataToSend.append('photo', photoUrl);
      }

      const response = await fetch(`${BASE_URL}/tour`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend,
      });
      const { message } = await response.json();

      if (response.ok) {
        toast.success(message);
        setTimeout(() => {
          navigate('/all-tours');
        }, 1500);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Create New Tour
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Fill in the details below to add a new tour to your collection
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={24} className="text-BaseColor" strokeWidth={2.5} />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tour Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter tour title (e.g., Majestic Mountain Adventure)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
                    value={formData.title}
                    onChange={handleInput}
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin 
                      size={20} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      strokeWidth={2.5}
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter city name"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
                      value={formData.city}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Navigation
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      strokeWidth={2.5}
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter complete address"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
                      value={formData.address}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>

                {/* Latitude */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Latitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="lat"
                    step="any"
                    placeholder="e.g., 40.7128"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
                    value={formData.location.lat}
                    onChange={handleInput}
                    required
                  />
                </div>

                {/* Longitude */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Longitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="lng"
                    step="any"
                    placeholder="e.g., -74.0060"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
                    value={formData.location.lng}
                    onChange={handleInput}
                    required
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="desc"
                    placeholder="Describe the tour experience, highlights, and what makes it special..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300 resize-none"
                    value={formData.desc}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Capacity Section */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign size={24} className="text-green-600" strokeWidth={2.5} />
                Pricing & Capacity
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (₦) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign 
                      size={20} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      strokeWidth={2.5}
                    />
                    <input
                      type="number"
                      name="price"
                      placeholder="0"
                      min="0"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
                      value={formData.price}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>

                {/* Max Group Size */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Group Size <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users 
                      size={20} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      strokeWidth={2.5}
                    />
                    <input
                      type="number"
                      name="maxGroupSize"
                      placeholder="1"
                      min="1"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
                      value={formData.maxGroupSize}
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>

                {/* Distance */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Distance (km)
                  </label>
                  <div className="relative">
                    <Navigation 
                      size={20} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      strokeWidth={2.5}
                    />
                    <input
                      type="number"
                      name="distance"
                      placeholder="0"
                      min="0"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
                      value={formData.distance}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Media & Features Section */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon size={24} className="text-purple-600" strokeWidth={2.5} />
                Media & Features
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tour Photo <span className="text-red-500">*</span>
                  </label>

                  {/* Drag and Drop Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                      isDragOver
                        ? 'border-BaseColor bg-BaseColor/5'
                        : selectedFile
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-300 hover:border-BaseColor hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {selectedFile && previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload
                          size={48}
                          className={`mx-auto mb-4 ${
                            isDragOver ? 'text-BaseColor' : 'text-gray-400'
                          }`}
                          strokeWidth={1.5}
                        />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          {isDragOver ? 'Drop your image here' : 'Drag & drop your tour image'}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          or click to browse files
                        </p>
                        <p className="text-xs text-gray-400">
                          Supports: JPG, PNG, GIF (Max 5MB)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {/* Alternative URL Input */}
                  {!selectedFile && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Or enter an image URL:</p>
                      <input
                        type="url"
                        name="photo"
                        placeholder="https://example.com/tour-image.jpg"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300 text-sm"
                        value={formData.photo}
                        onChange={handleInput}
                      />
                    </div>
                  )}
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3">
                    <Star 
                      size={24} 
                      className="text-amber-600" 
                      fill={formData.featured ? "currentColor" : "none"}
                      strokeWidth={2.5}
                    />
                    <div>
                      <label className="text-sm font-semibold text-gray-900">
                        Mark as Featured Tour
                      </label>
                      <p className="text-xs text-gray-600 mt-1">
                        Featured tours appear at the top of listings
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInput}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full md:w-auto px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-BaseColor to-BHoverColor hover:from-BHoverColor hover:to-BaseColor hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" strokeWidth={2.5} />
                    Creating Tour...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} strokeWidth={2.5} />
                    Create Tour
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTours;

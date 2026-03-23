import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },

    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
    bestTimeToVisit: {
      type: [String], // Array of months, e.g., ["March", "April", "May"]
      default: [],
    },
    weather: {
      avgTemp: {
        type: String, // e.g., "25°C - 30°C"
        default: "",
      },
      season: {
        type: String, // e.g., "Dry" or "Rainy"
        default: "",
      },
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    quickInfo: {
      bestTime: {
        type: String,
        default: "",
      },
      weather: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
      estimatedCost: {
        type: String,
        default: "",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);

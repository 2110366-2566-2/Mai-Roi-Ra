import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
    bookingDate: {
      type: Date,
      required: true,
    },
    checkoutDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    campground: {
      type: mongoose.Schema.ObjectId,
      ref: "Campground",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking
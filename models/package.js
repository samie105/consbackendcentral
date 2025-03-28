const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for a package
const PackageSchema = new Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
    },
    senderPhone: {
      type: String,
      required: true,
    },
    senderLocation: {
      type: String,
      required: true,
    },
    receiverEmail: {
      type: String,
      required: true,
    },
    receiverName: {
      type: String,
      required: true,
    },
    receiverPhone: {
      type: String,
      required: true,
    },
    receiverLocation: {
      type: String,
      required: true,
    },
    deliveryMode: {
      type: String,
      required: true,
    },
    contentName: {
      type: String,
      required: true,
    },
    contentWeight: {
      type: String,
    },
    contentHeight: {
      type: String,
    },
    contentWidth: {
      type: String,
    },
    contentLength: {
      type: String,
    },
    deliveryStatus: {
      type: String,
      default: "pending",
    },
    currentLocation: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "awaiting payment",
    },
    amountPaid: {
      type: String,
    },
    deliveryDate: {
      type: String,
    },
    checkpoints: [
      {
        location: {
          type: String,
        },

        status: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt fields
  }
);

// Create the model from the schema
const Package = mongoose.model("PackageEmma", PackageSchema);

module.exports = Package;

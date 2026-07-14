const Contact = require("../models/Contact");
const prisma = require("../config/prismaClient");

// ===============================
// GET Home Route
// ===============================
exports.getHome = (req, res) => {
  res.send("Server is running...");
};

// ===============================
// POST Test Route
// ===============================
exports.postTest = (req, res) => {
  res.status(200).json({
    message: "POST request received successfully!",
    data: req.body,
  });
};

// ===============================
// PUT Test Route
// ===============================
exports.putTest = (req, res) => {
  res.status(200).json({
    message: "PUT request received successfully!",
    updatedData: req.body,
  });
};

// ===============================
// DELETE Test Route
// ===============================
exports.deleteTest = (req, res) => {
  res.status(200).json({
    message: "DELETE request received successfully!",
  });
};

// ===============================
// POST /contact
// Save contact to MongoDB & PostgreSQL
// ===============================
exports.createContact = async (req, res) => {
  try {
    let {
      name,
      email,
      contactNumber,
      message,
      address,
    } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!contactNumber || !contactNumber.trim()) {
      return res.status(400).json({
        success: false,
        message: "Contact Number is required.",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message cannot exceed 2000 characters.",
      });
    }

    // ===============================
    // Remove Extra Spaces
    // ===============================

    name = name.trim();
    email = email.trim().toLowerCase();
    contactNumber = contactNumber.trim();
    message = message.trim();
    address = address ? address.trim() : null;

    const submittedAt = new Date();

    // ===============================
    // Save to MongoDB
    // ===============================

    const mongoContact = await Contact.create({
      name,
      email,
      contactNumber,
      message,
      address,
      submittedAt,
    });

    // ===============================
    // Save to PostgreSQL
    // ===============================

    const postgresContact = await prisma.contact.create({
      data: {
        name,
        email,
        contactNumber,
        message,
        address,
        submittedAt,
      },
    });

    // ===============================
    // Success Response
    // ===============================

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully.",
      data: {
        mongoContact,
        postgresContact,
      },
    });

  } catch (error) {
    console.error("Error saving contact:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
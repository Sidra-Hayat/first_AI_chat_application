const express = require("express");
const router = express.Router();

const {
  getHome,
  postTest,
  putTest,
  deleteTest,
  createContact,
} = require("../controllers/contactController");

// Test Routes
router.get("/", getHome);
router.post("/test", postTest);
router.put("/test", putTest);
router.delete("/test", deleteTest);

// Contact Route
router.route("/contact")
  .get((req, res) => {
    res.json({
      success: true,
      message: "You reached GET /contact"
    });
  })
  .post(createContact);

module.exports = router;
console.log("✅ contactRoutes.js loaded");
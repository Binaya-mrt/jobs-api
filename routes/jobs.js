const {
  getAJob,
  getAllJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const express = require("express");
const router = express.Router();

router.route("/").post(createJob).get(getAllJob);
router.route("/:id").get(getAJob).patch(updateJob).delete(deleteJob);

module.exports = router;

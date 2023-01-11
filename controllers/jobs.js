const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const getAllJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.CREATED).json({ jobs });
};

const getAJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new BadRequestError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.CREATED).json({ job });
};
const createJob = async (req, res) => {
  console.log(req.user.userId);
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("company or position cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new BadRequestError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new BadRequestError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.GONE).json({ message: "Job deleted!" });
};

module.exports = {
  getAJob,
  getAllJob,
  createJob,
  updateJob,
  deleteJob,
};

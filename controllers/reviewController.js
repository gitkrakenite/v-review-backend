const Review = require("../models/reviewModel");
const User = require("../models/userModel");

// create a review
const createReview = async (req, res) => {
  const {
    title,
    description,
    category,
    rating,
    creator,
    image1,
    image2,
    image3,
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !rating ||
    !creator ||
    !image1 ||
    !image2 ||
    !image3
  ) {
    return res.status(404).send("Details missing");
  }

  try {
    const review = await Review.create({
      title,
      description,
      category,
      rating,
      creator,
      image1,
      image2,
      image3,
    });
    if (review) {
      return res.status(201).send(review);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

const fetchReviews = async (req, res, next) => {
  try {
    const review = await Review.find().sort({ $natural: -1 });
    res.status(200).send(review);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteReviews = async (req, res, next) => {
  // check if review exist

  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(400).json({ message: "review not found" });
    return;
  }

  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete review" });
  }
};

const fetchReviewBasedOnSth = async (req, res) => {
  const { category } = req.body;
  try {
    const review = await Review.find({
      category,
    }).sort({ $natural: -1 });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).send(error);
  }
};

const commentOnReview = async (req, res) => {
  try {
    0;
    const { username, comment } = req.body;

    // Find the review by ID
    const review = await Review.findById(req.params.id);

    // find if the username exists
    const user = await User.findOne({ username });

    // If the review doesn't exist, return an error
    if (!review) {
      return res.status(404).json({ error: "review not found" });
    }

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Create a new comment
    const newComment = {
      username,
      comment,
    };

    // Add the comment to the review's comments array
    review.comments.push(newComment);

    // Save the updated review with the new comment
    await review.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed To Coment" });
  }
};

const fetchSpecificPost = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    res.status(200).send(review);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

// API that checks if review exists
const checkIfReviewAlreadyExists = async (req, res) => {
  const { title } = req.body;

  try {
    const reviewExists = await Review.findOne({ title });
    if (reviewExists) {
      let exists = "exists";
      return res.status(200).send(exists);
    } else {
      let exists = "not exist";
      return res.status(200).send(exists);
    }
  } catch (error) {
    return res.status(400).send("Error Checking");
  }
};

module.exports = {
  createReview,
  fetchReviews,
  fetchReviewBasedOnSth,
  commentOnReview,
  deleteReviews,
  fetchSpecificPost,
  checkIfReviewAlreadyExists,
};

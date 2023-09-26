const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");

const reviewRouter = require("./reviewRoutes");

const router = express.Router();

// POST /tour/234fad4/review
// GET /tour/234fad4/review

router.use("/:tourId/reviews", reviewRouter);

// router.param("id", tourController.checkId);
router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getDistanceWithin);

router.route("/distances/:latlng/unit/:unit").get(tourController.getDistances);

router
  .route("/")
  .get(tourController.getAllTours)
  // .post(tourController.checkBody, tourController.createTour);
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = router;

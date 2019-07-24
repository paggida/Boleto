const express = require("express");
const routes = express.Router();
const barCodeController = require("./app/controllers/barCodeController");
const verifyBarCode = require("./app/middlewares/verifyBarCode");

routes.get("/barcode/:barcode", verifyBarCode, barCodeController.getDetails);

module.exports = routes;

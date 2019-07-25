const express = require("express")
const routes = express.Router()
const lineCodeController = require("./app/controllers/lineCodeController")
const verifyLineCode = require("./app/middlewares/verifyLineCode")

routes.get("/lineCode/:lineCode", verifyLineCode, lineCodeController.getDetails)

module.exports = routes

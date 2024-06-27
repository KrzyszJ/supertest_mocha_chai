const baseURL = "https://restful-booker.herokuapp.com"
const request = require("supertest")(baseURL)
const expect = require("chai").expect

module.exports = { request, expect }
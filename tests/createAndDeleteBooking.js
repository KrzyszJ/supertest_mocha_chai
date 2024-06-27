const { request, expect } = require("../config")
const random = require("lodash.random")
const { faker } = require('@faker-js/faker')

let authToken, bookingID

describe("test creating and deleting booking", function() {

    it("creates booking", async function() {
        const response = await request.post("/booking")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send({
                "firstname" : faker.person.firstName(),
                "lastname" : faker.person.lastName(),
                "totalprice" : random(1, 10000),
                "depositpaid" : faker.datatype.boolean(),
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                }
            })
        expect(response.status).to.eql(200)
        bookingID = response.body.bookingid
    })

    it("receives auth token", async function() {
        const response = await request.post("/auth")
            .set("Content-Type", "application/json")
            .send({
                "username" : "admin",
                "password" : "password123"
            })
        expect(response.status).to.eql(200)
        authToken = response.body.token
    })

    it("deletes booking by id", async function() {
        const response = await request.delete(`/booking/${bookingID}`)
            .set("Content-Type", "application/json")
            .set("Cookie", `token=${authToken}`)

        expect(response.status).to.eql(201)
    })

})
const { request, expect } = require("../config")
let bookingID

describe("verifies getting bookings data", function () {
    it("returns all bookings ids", async function () {
        const allBookings = await request.get("/booking")

        bookingID = allBookings.body[0].bookingid
        expect(allBookings.status).to.eql(200)
    })

    it("returns booking by id", async function() {
        const specificIDBooking = await request
            .get(`/booking/${bookingID}`)
            .set("Accept", "application/json")
        expect(specificIDBooking.status).to.eql(200)
    })
})
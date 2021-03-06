var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/**
 * Helpers
 **/

    
async function sendAllBookings(res) {
    // We don't need try/catch here because we're always called from within one

    let sql = `
    SELECT bookings.*, service_post.*, r.*, p.first_name AS providerFirstName, p.last_name AS providerLastName, p.photo AS providerAvatar, bookings.id AS bookingId, service_post.id AS sPostId, rph.filename AS requestorPhoto, rph.id AS requestorPhotoId, pph.filename AS providerPhoto, pph.id AS providerPhotoId
    FROM bookings 
    LEFT JOIN service_post ON service_post.id = bookings.fk_service_post_id
    LEFT JOIN users AS r ON r.id = bookings.fk_requestor_id
    LEFT JOIN users AS p ON p.id = service_post.fk_provider_id
    LEFT JOIN photos AS rph ON rph.fk_user_id = r.id
    LEFT JOIN photos AS pph ON pph.fk_user_id = p.id
    ORDER BY bookingId ASC
    `;
    let results = await db(sql);
    let allBookings = joinToJson(results);
    res.send(allBookings);
}

// Convert the DB results into a useful JSON format:
// A nested booking obj with nested requestor(user) obj and nested servicePost obj
function joinToJson(results) {
  
    let sBooking = results.data.map(row => ({
        bookingId: row.bookingId,
        bookingDescription: row.booking_description,
        proposedDate: row.proposed_date,
        estimatedTime: row.estimated_time,
        needDonation: row.need_donation,
        bookingStatus: row.booking_status,
         requestor: {
            userID: row.fk_requestor_id,
            firstName: row.first_name,
            lastName: row.last_name,
            street: row.street,
            houseNumber: row.house_number,
            cityCode: row.city_code,
            cityName: row.city_name,
            country: row.country,
            email: row.email,
            userDescription: row.user_description,
            requestorAvatar: row.photo,
            requestorProfilePicture: row.requestorPhoto,
            requestorPhotoId: row.requestorPhotoId
        },
        servicePost: {
            servicePostID: row.sPostId,
            serviceTitle: row.service_title,
            serviceDescription: row.service_description,
            serviceCapacity: row.capacity,
            serviceDonation: row.donation,
            serviceCategory: row.fk_category_id,
            serviceProvider: row.fk_provider_id,
            provider: {
                firstName: row.providerFirstName,
                lastName: row.providerLastName,
                providerAvatar: row.providerAvatar,
                providerProfilePicture: row.providerPhoto,
                providerPhotoId: row.providerPhotoId
            }
        },
    }));
    
      return sBooking;
    }

/**
 * Guards
 **/
async function ensureBookingExists(req, res, next) {
    try {
        let results = await db(`SELECT * FROM bookings WHERE id = ${req.params.id}`);
        // console.log("I am a booking result", results);
        if (results.data.length === 1) {
            // booking was found; save it in response obj for the route function to use
            res.locals.booking = results.data[0];
            // Let next middleware function run
            next();
        } else {
            res.status(404).send({ error: "Booking not found" });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

/**
 * Routes
 **/

// GET all bookings
router.get("/", async function(req, res) {
    try {
        sendAllBookings(res);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


//GET booking by ID
router.get("/:id", ensureBookingExists, async function(req, res) {
    // If we get here we know the booking exists (thanks to guard)
    let booking = res.locals.booking;

    try {
        // Get booking; we know it exists, thanks to guard
        // Use LEFT JOIN to also return service_post and user (requestor)
        let sql = `
        SELECT bookings.*, service_post.*, r.*, p.first_name AS providerFirstName, p.last_name AS providerLastName, p.photo AS providerAvatar, bookings.id AS bookingId, service_post.id AS sPostId, rph.filename AS requestorPhoto, rph.id AS requestorPhotoId, pph.filename AS providerPhoto, pph.id AS providerPhotoId
        FROM bookings 
        LEFT JOIN service_post ON service_post.id = bookings.fk_service_post_id
        LEFT JOIN users AS r ON r.id = bookings.fk_requestor_id
        LEFT JOIN users AS p ON p.id = service_post.fk_provider_id
        LEFT JOIN photos AS rph ON rph.fk_user_id = r.id
        LEFT JOIN photos AS pph ON pph.fk_user_id = p.id
        WHERE bookings.id = ${booking.id}
        `;
        let results = await db(sql);
        // Convert DB results into "sensible" JSON
        booking = joinToJson(results);
        res.send(booking);
    } catch (err) {
        res.status(500).send({ error: "problem" });
    }
});


// POST  - create a booking (request) 
router.post("/", async function(req, res) { 

    let { booking_description, proposed_date, estimated_time, need_donation, booking_status, fk_requestor_id, fk_service_post_id } = req.body; 
    
    let sql = ` 
    INSERT INTO bookings (booking_description, proposed_date, estimated_time, need_donation, booking_status, fk_requestor_id, fk_service_post_id)
    VALUES ("${booking_description}", "${proposed_date}", ${estimated_time}, ${need_donation}, "${booking_status}", ${fk_requestor_id}, ${fk_service_post_id})`; 

    try { 
    // post the request
    await db(sql); 
    // Return all bookings
    sendAllBookings(res); 
    } catch (err) { 
    res.status(500).send({ error: err.message });  
    } 
}); 

// PUT - edit the booking
router.put("/:bookingId", async (req, res) => {
    let { bookingId } = req.params;
    let { bookingDescription, proposedDate, estimatedTime, needDonation, bookingStatus, serviceTime, requestor, servicePost } = req.body;
  
    try {
        let result = await db(`SELECT * FROM bookings WHERE id = ${bookingId}`);  // does booking exist?
        if (result.data.length === 0) {
            res.status(404).send({ error: "Booking not found" });
        } else {
            let sql = `
                UPDATE bookings 

                SET booking_description = "${bookingDescription}", proposed_date = "${proposedDate}", estimated_time = ${estimatedTime}, need_donation = ${needDonation}, booking_status = "${bookingStatus}", fk_requestor_id = ${requestor.userID}, fk_service_post_id = ${servicePost.servicePostID}

                WHERE id = ${bookingId}
            `;
  
            await db(sql);  // update booking
            await sendAllBookings(res); 
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });
    
     
// DELETE post by ID 
router.delete("/:id", ensureBookingExists, async function(req, res) { 
    // If we get here we know the post exists (thanks to guard) 
    let booking = res.locals.booking; 
    
    try { 
    // Delete booking and other entires thanks to cascade 
    await db(`DELETE FROM bookings WHERE id = ${booking.id}`); 
    sendAllBookings(res); 
    } catch (err) { 
    res.status(500).send({ error: err.message });  
    } 
}); 

module.exports = router;

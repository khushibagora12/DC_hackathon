import mongoose from "mongoose"

const seatSchema = new mongoose.Schema({
    seatId : String,
    booked : {type: Boolean, default: false},
    userId: String
})

const event = new mongoose.Schema({
    eventId : String,
    seat : seatSchema
});

const EventModel = mongoose.models.events || mongoose.model("events", event);
export default EventModel;

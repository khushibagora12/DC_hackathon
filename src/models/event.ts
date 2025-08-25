import mongoose from "mongoose"

const event = new mongoose.Schema({
    eventId : String,
    seat : [{
        seatId : String,
        userId : String
    }]
});

const EventModel = mongoose.models.events || mongoose.model("events", event);
export default EventModel;

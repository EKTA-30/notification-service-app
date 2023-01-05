const TicketNotificationModel = require('../models/ticketNotificationModel');

// This controller adds a new notification to our db
exports.acceptNotificationRequest = async (req, res) => {
    const notificationObject = {
        subject : req.body.subject,
        content : req.body.content,
        recipientEmails : req.body.recipientEmails,
        requester : req.body.requester,
        ticketId : req.body.ticketId
    }
    try {
        const notification = await TicketNotificationModel.create(notificationObject);

        res.status(200).send({
            requestId : notification.ticketId,
            status:"Accepted request"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({msg:"Internal server error "})
    }
}


exports.getNotificationRequest = async (req,res) => {
    const reqId = req.params.id;

    try {
        const notification = await TicketNotificationModel.findOne({
            ticketId : reqId 
        });

        res.status(200).send({
            requestId : notification.ticketId,
            subject : notification.subject,
            content : notification.content,
            recipientEmails : notification.recipientEmails,
            sentStatus : notification.sentStatus
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}

exports.getAllNotificationRequest = async (req,res) => {

    try {
        const notifications = await TicketNotificationModel.find();

        res.status(200).send({
          notifications
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}
//This controller tells the client the current status of a notification
// exports.getNotificationStatus 
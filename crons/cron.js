const cron = require("node-cron");

const TicketNotificationModel = require("../models/ticketNotificationModel");

const EmailTransporter = require("../notifier/emailService");

cron.schedule("*/3 * * * * *", async () => {
  const notifications = await TicketNotificationModel.find({
    sentStatus: "UN_SENT",
  });

  console.log(`Count of notification : ${notifications.length}`);

  notifications.forEach((notification) => {
    const mailData = {
      from: "kumariekta1430@gmail.com",
      recipientEmails: notification.recipientEmails,
      subject: notification.subject,
      content: notification.content,
    };
    console.log(mailData);

    EmailTransporter.sendMail(mailData, async (err, data) => {
      if (err) {
        console.log(err.message,err);
      } else {
        console.log(data);
        const savedNotification = await TicketNotificationModel.findOne({
          _id: notification._id,
        });

        savedNotification.sentStatus = "SENT";
        await savedNotification.save();
      }
    });
  });
});

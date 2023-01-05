   const notificationController = require('../controllers/ticketNotificationController');

   module.exports = function(app){
    app.post("/notificationService/api/notifications",notificationController.acceptNotificationRequest);

    app.get("/notificationService/api/notifications/:id",notificationController.getNotificationRequest);

    app.get("/notificationService/api/notifications/",notificationController.getAllNotificationRequest)
   }
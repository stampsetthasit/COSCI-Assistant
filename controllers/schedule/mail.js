const { Op } = require("sequelize");
const cron = require("node-cron");
const MailNotifyHistory = require("../../models/mail_notify_history_schema");

const RequestController = require("../RequestController");
const AdminController = require("../AdminController");

const mailer = require("../../utils/utilities");

// Set up a cron job to run every day
cron.schedule("* * * * *", async () => {
  // Retrieve requests that need to be monitored
  const requests = await RequestController.getAllRequestNotCompleted();
  const notificationDelayDays = process.env.NOTIFICATION_DELAY_DAYS;

  // Check each request
  for (const request of requests) {
    const lastUpdateTimestamp = new Date(request.updated_at).getTime();
    const currentTimestamp = new Date().getTime();

    // Calculate the difference in days
    const daysDifference = Math.floor(
      (currentTimestamp - lastUpdateTimestamp) / (24 * 60 * 60 * 1000)
    );
    const hasNotificationSentLast24Hours = await hasEmailSentLast24Hours(
      request.req_id
    );

    // Check if day have passed and no email has been sent in the last 24 hours
    if (
      daysDifference >= notificationDelayDays &&
      !hasNotificationSentLast24Hours
    ) {
      // Get all admins related to the request
      const admins = await AdminController.getAdminInfo(request.req_ctg);

      for (const admin of admins) {
        const subject = `Reminder: Action Required for Request ${request.req_id}`;
        const html = `<body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Reminder</h2>
            <p>Hello ${admin.name},</p>
            <p>This is a reminder for the request with ID: <strong>${request.req_id}</strong>.</p>
            <p>Please take necessary actions accordingly.</p>
            <p>Thank you!</p>
          </div>
        </body>`;

        // Send email
        await mailer(admin.email, subject, html);

        // Create the history to indicate that an email has been sent
        await createHistory(request.req_id, admin.user_code);
      }
    }
  }
});

// Function to check if an email has been sent in the last 24 hours
async function hasEmailSentLast24Hours(reqId) {
  try {
    const data = await MailNotifyHistory.findOne({
      where: {
        req_id: reqId,
        created_at: {
          [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000), // records created in the last 24 hours
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Error checking mail history:", error);
  }
}

async function createHistory(reqId, to) {
  try {
    const data = await MailNotifyHistory.create({
      req_id: reqId,
      send_to: to,
    });

    return data;
  } catch (error) {
    console.error("Error creating mail history:", error);
  }
}

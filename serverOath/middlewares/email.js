export function sendEmail(req, res) {
    res.status(200).send({serviceID: process.env.SERVICE_ID, templateID: process.env.TEMPLATE_ID, userID: process.env.USER_ID});
}
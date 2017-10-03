/**
 * @swagger
 * /notification:
 *   post:
 *     tags:
 *       - Notifications
 *     description: Creates a new notification
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: notification
 *         description: Notification object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully created
 */

/**
 * @swagger
 * /notification/{id}:
 *   get:
 *     tags:
 *       - Notifications
 *     description: Returns a single notification
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Notification's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single notification
 */

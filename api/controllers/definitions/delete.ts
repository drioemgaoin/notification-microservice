/**
 * @swagger
 * /notification/{id}:
 *   delete:
 *     tags:
 *       - Notifications
 *     description: Deletes a single notification
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
 *         description: Successfully deleted
 */

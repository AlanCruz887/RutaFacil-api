import { Router } from "express";
import { getNotifications, createNotification, updateNotificationStatus,getNotificationsByVehicleID} from "../controllers/notification.controller.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";

const router = Router();

router.get("/get-token-notification", getNotifications)
router.get("/get-notification-by-vehicle/:vehicle_id", getNotificationsByVehicleID)
router.post("/create-notification", authenticateJWT,createNotification)
router.put("/update-notification", authenticateJWT,updateNotificationStatus)


export default router;

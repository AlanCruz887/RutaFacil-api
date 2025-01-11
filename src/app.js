import express from 'express';
import morgan from 'morgan';
import vehicleRoutes from './routes/vehicle.routes.js';
import routeRoutes from './routes/routes.routes.js';
import stopRoutes from './routes/stop.routes.js';
import stopScheduleRoutes from './routes/stopSchedule.routes.js';
import ratingRoutes from './routes/rating.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import vehicleLocationsRoutes from './routes/vehicle_locations.routes.js';
import userRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors'; // Importa CORS


const app = express();
app.use(cors()); // Permite solicitudes desde cualquier origen

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


app.use('/api/vehicles', vehicleRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/stops', stopRoutes);
app.use('/api/stop-schedules', stopScheduleRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/vehicle-locations', vehicleLocationsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);




export default app;
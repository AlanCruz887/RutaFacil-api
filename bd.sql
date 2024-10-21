-- Crear la base de datos
CREATE DATABASE transportation_db;

-- Usar la base de datos recién creada
USE transportation_db;

-- Desactivar las claves foráneas al inicio
SET FOREIGN_KEY_CHECKS = 0;

-- Tabla de Vehículos
CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    plate_number VARCHAR(20),
    model VARCHAR(50),
    capacity INT
);

-- Tabla de Rutas
CREATE TABLE routes (
    route_id INT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(100),
    starting_point VARCHAR(100),
    ending_point VARCHAR(100)
);

-- Tabla de Paradas
CREATE TABLE stops (
    stop_id INT AUTO_INCREMENT PRIMARY KEY,
    route_id INT,
    stop_name VARCHAR(100),
    sequence INT,
    FOREIGN KEY (route_id) REFERENCES routes(route_id) ON DELETE CASCADE
);

-- Tabla de Horarios de Paradas
CREATE TABLE stop_schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    stop_id INT,
    arrival_time TIME,
    FOREIGN KEY (stop_id) REFERENCES stops(stop_id) ON DELETE CASCADE
);

-- Tabla de Ubicaciones de Vehículos (Solo para eventos clave)
CREATE TABLE vehicle_locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    lat DECIMAL(9, 6),
    lon DECIMAL(9, 6),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_type ENUM('start_route', 'end_route', 'stop', 'significant_change'),
    direction ENUM('outbound', 'inbound'), -- outbound: desde la base de salida a la de llegada
                                           -- inbound: desde la base de llegada a la de salida
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- Tabla de Notificaciones
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- Tabla de Calificaciones
CREATE TABLE ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- Tabla de Usuarios
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    status ENUM('active', 'inactive', 'verified', 'unverified') DEFAULT 'unverified',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Reactivar las claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE rides (
    ride_id SERIAL PRIMARY KEY,
    origin_address VARCHAR(255) NOT NULL,
    destination_address VARCHAR(255) NOT NULL,
    origin_latitude DECIMAL(9, 6) NOT NULL,
    origin_longitude DECIMAL(9, 6) NOT NULL,
    destination_latitude DECIMAL(9, 6) NOT NULL,
    destination_longitude DECIMAL(9, 6) NOT NULL,
    ride_time INTEGER NOT NULL,
    fare_price DECIMAL(10, 2) NOT NULL CHECK (fare_price >= 0),
    payment_status VARCHAR(20) NOT NULL,
    driver_id INTEGER REFERENCES drivers(id),
    user_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
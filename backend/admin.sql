sqlUSE hoteldb;
GO

INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@hotel.com', 'admin123', 'admin');
GO
CREATE TABLE IF NOT EXISTS Users ( 
    Userld CHAR(10) NOT NULL, 
    PaymentGatewayCustomerId CHAR(10) NOT NULL, 
    PhoneNumber CHAR(10) NOT NULL, 
    BirthDate DATE, 
    Email VARCHAR(64) NOT NULL, 
    FirstName VARCHAR(64) NOT NULL, 
    LastName VARCHAR(64) NOT NULL, 
    Userlmage VARCHAR(1024), 
    CreatedAt TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
    PRIMARY KEY (Userld), 
    CONSTRAINT check_Userld_length 
    CHECK (LENGTH(Userld) = 10) 
);  CONSTRAINT check_Phone_length CHECK (LENGTH(PhoneNumber) = 10) 
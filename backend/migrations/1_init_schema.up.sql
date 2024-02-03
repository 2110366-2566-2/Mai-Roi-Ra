CREATE TABLE IF NOT EXISTS Admins (
    AdminId CHAR(10) NOT NULL,
    Password VARCHAR(64) NOT NULL,
    CreatedAt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY (AdminId),
    CONSTRAINT check_AdminId_length CHECK(LENGTH(AdminId) = 10)
);

CREATE TABLE IF NOT EXISTS Users (
    UserId CHAR(10) NOT NULL,
    PaymentGatewayCustomerId CHAR(10) NOT NULL,
    PhoneNumber CHAR(10) NOT NULL,
    BirthDate DATE,
    Email VARCHAR(64) NOT NULL,
    FirstName VARCHAR(64) NOT NULL,
    LastName VARCHAR(64) NOT NULL,
    UserImage VARCHAR(1024),
    CreatedAt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY (UserId),
    CONSTRAINT check_UserId_length CHECK (LENGTH(UserId) = 10),
    CONSTRAINT check_Phone_length CHECK (LENGTH(PhoneNumber) = 10)
);

CREATE TABLE IF NOT EXISTS Organizers (
    OrganizerId CHAR(10) NOT NULL,
    OfficeHours TIMESTAMP[] NOT NULL,
    CreatedAt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    UserId CHAR(10) NOT NULL,
    PRIMARY KEY (OrganizerId),
    CONSTRAINT fk_user FOREIGN KEY (UserId)
    REFERENCES Users(UserId)
    ON DELETE CASCADE,
    CONSTRAINT check_OrganizerId_length CHECK (LENGTH(OrganizerId) = 10)
);

CREATE TABLE IF NOT EXISTS Moderates (
    UserId CHAR(10) NOT NULL,
    OrganizerId CHAR(10) NOT NULL,
    CreatedAt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (UserId)
    REFERENCES Users(UserId) ON DELETE CASCADE,
    CONSTRAINT fk_organizer FOREIGN KEY (OrganizerId)
    REFERENCES Organizers(OrganizerId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Locations (
    LocationId CHAR(10) NOT NULL,
    Country VARCHAR(64) NOT NULL,
    City VARCHAR(64) NOT NULL,
    District VARCHAR(64) NOT NULL,
    LocationName VARCHAR(64) NOT NULL,
    PRIMARY KEY (LocationId),
    CONSTRAINT check_LocationId_length CHECK (LENGTH(LocationId) = 10)
);

CREATE TABLE IF NOT EXISTS Events (
    EventId CHAR(10) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Status TEXT NOT NULL CHECK (Status IN ('Approved', 'Rejected', 'Waiting')),
    Participantfee DOUBLE PRECISION NOT NULL,
    Description VARCHAR(1000),
    EventName VARCHAR(64) NOT NULL,
    CreatedAt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    Deadline DATE NOT NULL,
    Activities CHAR(10) NOT NULL,
    EventImage VARCHAR(1024),
    OrganizerId CHAR(10) NOT NULL,
    AdminId CHAR(10) NOT NULL,
    LocationId CHAR(10) NOT NULL,
    PRIMARY KEY (EventId),
    CONSTRAINT fk_organizer FOREIGN KEY (OrganizerId)
    REFERENCES Organizers(OrganizerId) ON DELETE CASCADE,
    CONSTRAINT fk_admin FOREIGN KEY (AdminId)
    REFERENCES Admins(AdminId) ON DELETE CASCADE,
    CONSTRAINT fk_location FOREIGN KEY (LocationId)
    REFERENCES Locations(LocationId) ON DELETE CASCADE,
    CONSTRAINT check_EventId_length CHECK (LENGTH(EventId) = 10)
);

CREATE TABLE IF NOT EXISTS Posts (
    PostId CHAR(10) NOT NULL,
    CreatedAt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    PostImage VARCHAR(1024),
    caption VARCHAR(1000),
    RatingScore INT NOT NULL,
    UserId CHAR(10) NOT NULL,
    PRIMARY KEY (PostId),
    CONSTRAINT fk_user FOREIGN KEY (UserId)
    REFERENCES Users(UserId) ON DELETE CASCADE,
    CONSTRAINT check_PostId_length CHECK (LENGTH(PostId) = 10)
);

CREATE TABLE IF NOT EXISTS Responses (
    OrganizerId CHAR(10) NOT NULL,
    PostId CHAR(10) NOT NULL,
    Detail CHAR(1000),
    CreatedAt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT fk_organizer FOREIGN KEY (OrganizerId)
    REFERENCES Organizers(OrganizerId) ON DELETE CASCADE,
    CONSTRAINT fk_post FOREIGN KEY (PostId)
    REFERENCES Posts(PostId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Reviews (
    UserId CHAR(10) NOT NULL,
    EventId CHAR(10) NOT NULL,
    PostId CHAR(10) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (UserId)
    REFERENCES Users(UserId) ON DELETE CASCADE,
    CONSTRAINT fk_post FOREIGN KEY (PostId)
    REFERENCES Posts(PostId) ON DELETE CASCADE,
    CONSTRAINT fk_event FOREIGN KEY (EventId)
    REFERENCES Events(EventId) ON DELETE CASCADE
);
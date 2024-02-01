package models

// Location model struct
type Location struct {
	LocationID   string `gorm:"type:char(10);not null;primaryKey" json:"location_id"`
	Country      string `gorm:"type:varchar(64);not null" json:"country" binding:"required"`
	City         string `gorm:"type:varchar(64);not null" json:"city" binding:"required"`
	District     string `gorm:"type:varchar(64);not null" json:"district" binding:"required"`
	LocationName string `gorm:"type:varchar(64);not null" json:"location_name" binding:"required"`
}

// TableName specifies the table name for the Location model
func (Location) TableName() string {
	return "Locations"
}

// CustomValidatorLocation struct to define custom validation rules for Location
type CustomValidatorLocation struct{}

// ValidateLocationID is a custom validator function for location ID
func (CustomValidatorLocation) ValidateLocationID(field interface{}) bool {
	if locationID, ok := field.(string); ok {
		// Add any custom validation logic for LocationID if needed
		return len(locationID) == 10
	}
	return false
}
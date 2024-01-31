package model

type Location struct {
	LocationId   string `json:"locationId" binding:"required"`
	Country      string `json:"country" binding:"required"`
	City         string `json:"city" binding:"required"`
	District     string `json:"district" binding:"required"`
	LocationName string `json:"locationName" binding:"required"`
}
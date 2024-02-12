package structure

type GetLocationByIdRequest struct {
	LocationId string `json:"location_id"`
}

type GetLocationByIdResponse struct {
	Country      string `json:"country"`
	City         string `json:"city"`
	District     string `json:"district"`
	LocationName string `json:"location_name"`
}

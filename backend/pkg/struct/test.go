package structure

import "mime/multipart"

type TestRequest struct {
}

type TestResponse struct {
	Message string `json:"message"`
}

type TestUpload struct {
	ImageFileHeader *multipart.FileHeader
}

package utils

import (
	"mime/multipart"
)

func IsNilHeader(req *multipart.FileHeader) bool {
	if req == nil || req.Header == nil {
		return true
	}
	return false
}

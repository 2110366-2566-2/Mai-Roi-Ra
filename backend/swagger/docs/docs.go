// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "url": "http://www.swagger.io/support",
            "email": "support@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/events": {
            "get": {
                "description": "Get list of events",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "events"
                ],
                "summary": "GetEventLists",
                "parameters": [
                    {
                        "type": "string",
                        "description": "For My events",
                        "name": "organizer_id",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "description": "Status query. i.e. Approved",
                        "name": "filter",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "description": "Sort order. i.e. start_date ASC",
                        "name": "sort",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "offset i.e. 0",
                        "name": "offset",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "Items per page i.e. 10",
                        "name": "limit",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/structure.GetEventListsResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "object"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "object"
                        }
                    }
                }
            },
            "post": {
                "description": "Create a new event with the provided details.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "events"
                ],
                "summary": "Create new event",
                "parameters": [
                    {
                        "description": "Create Event Request",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/structure.CreateEventRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/structure.CreateEventResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "object"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "object"
                        }
                    }
                }
            }
        },
        "/events/{event_id}": {
            "get": {
                "description": "Get a test message",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "events"
                ],
                "summary": "GetEventDataById",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Event ID",
                        "name": "event_id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/structure.GetEventDataByIdResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "object"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "object"
                        }
                    }
                }
            }
        },
        "/locations/{location_id}": {
            "get": {
                "description": "Get location by id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "locations"
                ],
                "summary": "GetLocationById",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Location ID",
                        "name": "location_id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/structure.GetLocationByIdResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "object"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "object"
                        }
                    }
                }
            }
        },
        "/test": {
            "get": {
                "description": "Get a test message",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Test"
                ],
                "summary": "GetTest",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/structure.TestResponse"
                        }
                    }
                }
            }
        },
        "/users/{user_id}": {
            "get": {
                "description": "Get User from given field (user_id)",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "user"
                ],
                "summary": "GetUserByUserId",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User ID",
                        "name": "user_id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.User"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "object"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "object"
                        }
                    }
                }
            },
            "put": {
                "description": "Update User information with the desired input",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "user"
                ],
                "summary": "UpdateUserInformation",
                "parameters": [
                    {
                        "description": "Update User Request",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/structure.UpdateUserInformationRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.User"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "object"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "object"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "models.User": {
            "type": "object",
            "properties": {
                "address": {
                    "type": "string"
                },
                "banner_image": {
                    "type": "string"
                },
                "birth_date": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string"
                },
                "district": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "first_name": {
                    "type": "string"
                },
                "last_name": {
                    "type": "string"
                },
                "payment_gateway_customer_id": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "province": {
                    "type": "string"
                },
                "updated_at": {
                    "type": "string"
                },
                "user_id": {
                    "type": "string"
                },
                "user_image": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "structure.CreateEventRequest": {
            "type": "object",
            "required": [
                "activities",
                "admin_id",
                "deadline",
                "description",
                "end_date",
                "event_name",
                "location_id",
                "organizer_id",
                "participant_fee",
                "start_date",
                "status"
            ],
            "properties": {
                "activities": {
                    "type": "string"
                },
                "admin_id": {
                    "type": "string"
                },
                "deadline": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "end_date": {
                    "type": "string"
                },
                "event_image": {
                    "type": "string"
                },
                "event_name": {
                    "type": "string"
                },
                "location_id": {
                    "type": "string"
                },
                "organizer_id": {
                    "type": "string"
                },
                "participant_fee": {
                    "type": "number"
                },
                "start_date": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "structure.CreateEventResponse": {
            "type": "object",
            "properties": {
                "event_id": {
                    "type": "string"
                }
            }
        },
        "structure.GetEventDataByIdResponse": {
            "type": "object",
            "properties": {
                "activities": {
                    "type": "string"
                },
                "admin_id": {
                    "type": "string"
                },
                "city": {
                    "type": "string"
                },
                "country": {
                    "type": "string"
                },
                "deadline": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "district": {
                    "type": "string"
                },
                "end_date": {
                    "type": "string"
                },
                "event_id": {
                    "type": "string"
                },
                "event_image": {
                    "type": "string"
                },
                "event_name": {
                    "type": "string"
                },
                "location_id": {
                    "type": "string"
                },
                "location_name": {
                    "type": "string"
                },
                "organizer_id": {
                    "type": "string"
                },
                "participant_fee": {
                    "type": "number"
                },
                "start_date": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "structure.GetEventList": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "district": {
                    "type": "string"
                },
                "end_date": {
                    "type": "string"
                },
                "event_id": {
                    "type": "string"
                },
                "event_image": {
                    "type": "string"
                },
                "event_name": {
                    "type": "string"
                },
                "start_date": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "structure.GetEventListsResponse": {
            "type": "object",
            "properties": {
                "event_lists": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/structure.GetEventList"
                    }
                }
            }
        },
        "structure.GetLocationByIdResponse": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string"
                },
                "country": {
                    "type": "string"
                },
                "district": {
                    "type": "string"
                },
                "location_name": {
                    "type": "string"
                }
            }
        },
        "structure.TestResponse": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        },
        "structure.UpdateUserInformationRequest": {
            "type": "object",
            "required": [
                "address",
                "birth_date",
                "district",
                "first_name",
                "last_name",
                "phone_number",
                "province",
                "user_id"
            ],
            "properties": {
                "address": {
                    "type": "string"
                },
                "birth_date": {
                    "type": "string"
                },
                "district": {
                    "type": "string"
                },
                "first_name": {
                    "type": "string"
                },
                "last_name": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "province": {
                    "type": "string"
                },
                "user_id": {
                    "type": "string"
                },
                "user_image": {
                    "type": "string"
                }
            }
        }
    },
    "securityDefinitions": {
        "BasicAuth": {
            "type": "basic"
        }
    },
    "externalDocs": {
        "description": "OpenAPI",
        "url": "https://swagger.io/resources/open-api/"
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:8080",
	BasePath:         "/api/v1",
	Schemes:          []string{},
	Title:            "Mai-Roi-Ra Swagger API",
	Description:      "This is a sample server Mai-Roi-Ra api gateway.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}

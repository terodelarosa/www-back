package main

import (
    "log"

    "github.com/gofiber/fiber/v3"
)

func main() {
    // Initialize a new Fiber app
    app := fiber.New()

    // Start the server on port 3000
    log.Fatal(app.Listen(":3000"))
}
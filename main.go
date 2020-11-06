package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/KrysOlechowski/heroku1/server/router"
)

// func test(w http.ResponseWriter, r *http.Request) {
// 	io.WriteString(w, "HELLO TEST")
// }

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	r := router.Router()
	fmt.Println("Starting server on the port " + port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

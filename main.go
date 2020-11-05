package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/KrysOlechowski/heroku1/server/router"
)

// func hello(w http.ResponseWriter, r *http.Request) {
// 	io.WriteString(w, "HELLO WORLDxxxxxx")
// }

// func test(w http.ResponseWriter, r *http.Request) {
// 	io.WriteString(w, "HELLO TEST")
// }

// func hello2() string {
// 	return quote.Hello()
// }

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000" // Default port if not specified
	}
	r := router.Router()
	fmt.Println("Starting server on the port" + port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

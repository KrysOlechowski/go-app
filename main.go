package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/KrysOlechowski/heroku1/router"
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
	// port := "3000"
	// http.HandleFunc("/", hello)
	// http.HandleFunc("/test", middleware.GetAllTask)
	// log.Print("Listening on :" + port)
	// log.Fatal(http.ListenAndServe(":"+port, nil))
	r := router.Router()
	fmt.Println("Starting server on the port 8080...")
	log.Fatal(http.ListenAndServe(":"+port, r))
}

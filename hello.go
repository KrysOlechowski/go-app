package main

import (
	"io"
	"log"
	"net/http"

	"github.com/KrysOlechowski/heroku1/middleware"
	"rsc.io/quote"
)

func hello(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "HELLO WORLD")
}

// func test(w http.ResponseWriter, r *http.Request) {
// 	io.WriteString(w, "HELLO TEST")
// }

func hello2() string {
	return quote.Hello()
}

func main() {
	// port := os.Getenv("PORT")
	port := "3000"
	http.HandleFunc("/", hello)
	http.HandleFunc("/test", middleware.GetAllTask)
	log.Print("Listening on :" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

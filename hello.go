package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

func hello(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "HELLO WORLD")
}

func main() {
	port := os.Getenv("PORT")
	// port := "3000"
	http.HandleFunc("/", hello)
	log.Print("Listening on :" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

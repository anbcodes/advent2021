package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	fmt.Println("Go:")
	content, err := ioutil.ReadFile("text.txt") // the file is inside the local directory
	if err != nil {
		fmt.Println("Error reading file")
	}

	str := string(content)

	input := strings.Split(str, "\n")

	total = 0
	for i, v := range input {
		value_number, err = strconv.Atoi(v);
		if ()
		if i > 0 &&  > input[i-1] {
			total += 1
		}
	}
}

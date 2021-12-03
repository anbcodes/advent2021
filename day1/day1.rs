fn main() {
    println!("Rust:");

    let contents = std::fs::read_to_string("input.txt").expect("Failed to read input file");

    let mut prev = 100000000;

    let result = contents
        .lines()
        .map(|x| x.parse::<i32>().expect("Failed to parse int"))
        .fold(0, |t, x| {
            let ret = t + if x > prev { 1 } else { 0 };
            prev = x;
            ret
        });
    println!("    Part 1: {}", result.to_string());

    let input_arr = contents
        .lines()
        .map(|x| x.parse::<i32>().expect("Failed to parse int"))
        .enumerate()
        .collect::<Vec<(usize, i32)>>();
    let rolling_addition = input_arr.iter().map(|(i, _)| {
        if *i < input_arr.len() - 2 {
            input_arr[*i].1 + input_arr[*i + 1].1 + input_arr[*i + 2].1
        } else {
            0
        }
    });

    prev = 100000000;

    let result2 = rolling_addition.fold(0, |t, x| {
        let ret = t + if x > prev { 1 } else { 0 };
        prev = x;
        ret
    });

    println!("    Part 2: {}", result2.to_string());
}

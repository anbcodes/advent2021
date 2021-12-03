package day1;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class day1 {
  public static void main(String[] args) {
    System.out.println("Java: ");
    try {

      File myObj = new File("input.txt");

      System.out.println("    Part 1: " + day1.part1(myObj).toString());
      System.out.println("    Part 2: " + day1.part2(myObj).toString());
    } catch (FileNotFoundException e) {
      System.out.println("Input file not found");
    }
  }

  public static Integer part1(File file) throws FileNotFoundException {
    Integer prevValue = 1000000;
    Integer total = 0;

    Scanner myReader = new Scanner(file);
    while (myReader.hasNextLine()) {
      String data = myReader.nextLine();
      Integer inputValue = Integer.parseInt(data);

      if (inputValue > prevValue) {
        total += 1;
      }

      prevValue = inputValue;
    }
    myReader.close();
    return total;
  }

  public static Integer part2(File file) throws FileNotFoundException {
    Integer prevValue1 = 1000000;
    Integer prevValue2 = 1000000;
    Integer prevValue3 = 1000000;
    Integer total = 0;

    Scanner myReader = new Scanner(file);
    while (myReader.hasNextLine()) {
      String data = myReader.nextLine();
      Integer inputValue = Integer.parseInt(data);

      if (inputValue + prevValue1 + prevValue2 > prevValue1 + prevValue2 + prevValue3) {
        total += 1;
      }

      prevValue3 = prevValue2;
      prevValue2 = prevValue1;
      prevValue1 = inputValue;
    }
    myReader.close();
    return total;
  }
}

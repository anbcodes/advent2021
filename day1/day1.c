#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void main()
{
  printf("C:\n");

  FILE *file_ptr = fopen("input.txt", "r");

  if (file_ptr == NULL)
  {
    printf("Error getting file pointer (file may not exist)");
    exit(1);
  }

  int total_p1 = 0;
  int total_p2 = 0;
  int prev_buf[3] = {1000000, 1000000, 1000000};

  while (true)
  {
    int num = 0;

    fscanf(file_ptr, "%d", &num);

    if (num == 0)
    {
      break;
    }

    if (num > prev_buf[0])
    {
      total_p1 += 1;
    }

    if (num + prev_buf[0] + prev_buf[1] > prev_buf[0] + prev_buf[1] + prev_buf[2])
    {
      total_p2 += 1;
    }

    prev_buf[2] = prev_buf[1];
    prev_buf[1] = prev_buf[0];
    prev_buf[0] = num;
  }

  printf("    Part 1: %d\n", total_p1);
  printf("    Part 2: %d\n", total_p2);

  fclose(file_ptr);
}
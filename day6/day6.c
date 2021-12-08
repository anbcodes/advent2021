#include <stdio.h>

void main()
{
  FILE *file_ptr = fopen("input.txt", "r");

  if (file_ptr == NULL)
  {
    printf("Error getting file pointer (file may not exist)");
    exit(1);
  }
}
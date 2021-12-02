print("Python:")

with open('input.txt') as f:
  values = []
  for line in f.readlines():
    values.append(int(line))
  
  result = 0
  for i in range(len(values)):
    try:
      if values[i] > values[i - 1]:
        result += 1
    except IndexError:
      pass

  print('    Part 1:', result)

  result_p2 = 0
  for i in range(len(values)):
    try:
      prev_3 = values[i - 1] + values[i] + values[i + 1]
      curr_3 = values[i] + values[i + 1] + values[i + 2]

      if (curr_3 > prev_3):
        result_p2 += 1

    except IndexError:
      pass
  
  print('    Part 2:', result_p2)

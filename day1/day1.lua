print("Lua:")

-- No split function in lua, so I got this from stack overflow (https://stackoverflow.com/a/7615129/9225514)
local function mysplit(inputstr, sep)
  if sep == nil then
          sep = "%s"
  end
  local t={}
  for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
          table.insert(t, str)
  end
  return t
end


local file = io.open("./input.txt", "r")
if not file then
  print("    Couldn't find file!")
  os.exit(1)
end

local content = file:read "*a"
file:close()

local lines = mysplit(content, "\n")
local total = 0

for i = 2, #(lines), 1 do
  if tonumber(lines[i], 10) > tonumber(lines[i - 1], 10) then
    total = total + 1
  end
end

io.write(string.format("    Part 1: %d\n", total))

local total = 0
for i = 2, #(lines) - 2, 1 do
  if tonumber(lines[i], 10) + tonumber(lines[i + 1], 10) + tonumber(lines[i + 2], 10) > tonumber(lines[i - 1], 10) + tonumber(lines[i], 10) + tonumber(lines[i + 1], 10) then
    total = total + 1
  end
end

io.write(string.format("    Part 2: %d\n", total))

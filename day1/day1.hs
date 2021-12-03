import Control.Applicative (WrappedMonad (unwrapMonad))
import Data.List (elemIndex)
import Data.Maybe (fromMaybe, mapMaybe)
import Text.Read (readEither, readMaybe)

-- readFirst :: String -> Int
-- readFirst x = mapMaybe readMaybe $ split "\n" x !! 1

main = do
  putStrLn "Haskell: Not implemented"

--   fileContents <- readFile "input.txt"
--   print $ (split "\n" fileContents) !! 1
--   print $ readFirst fileContents
--   putStrLn ("    Part 1: " ++ show (part1 fileContents))

-- part1 :: String -> Int
-- part1 x = foldl greaterAdder 0 $ zip [0 ..] inputArr
--   where
--     greaterAdder t e = if snd e > fromMaybe 0 (elemIndex (fst e - 1) inputArr) then t + 1 else t
--     inputArr :: [Int]
--     inputArr = mapMaybe readMaybe $ split "\n" x

-- -- Stack Overflow (https://stackoverflow.com/a/68310828/9225514)
-- split :: String -> String -> [String]
-- split _ "" = []
-- split delim str =
--   split' "" str []
--   where
--     dl = length delim

--     split' :: String -> String -> [String] -> [String]
--     split' h t f
--       | dl > length t = f ++ [h ++ t]
--       | delim == take dl t = split' "" (drop dl t) (f ++ [h])
--       | otherwise = split' (h ++ take 1 t) (drop 1 t) f
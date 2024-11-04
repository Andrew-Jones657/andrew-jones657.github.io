-- These are some simple SQL queries I used to find particular population values or
-- a range of population values. In some cases I took a range of values and ran them in
-- the python script above. 

SELECT * FROM "Census Blocks" WHERE POPULATION = n; 
SELECT * FROM "Census Blocks" WHERE POPULATION = n < 10; 

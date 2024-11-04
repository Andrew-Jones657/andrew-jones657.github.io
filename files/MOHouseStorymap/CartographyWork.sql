-- SQL was used to manage custom label sizes for
-- places and highways.

SELECT * FROM 'National and State Roads' WHERE 
RTTYP = 'U' // Other values included 'I', 'S' 

SELECT * FROM 'Cities' WHERE POPULATION <= 500
-- Other values included '500-2500', '2500-10000',
-- '10000-50000', '50000-100000', '100000-508090'

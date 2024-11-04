-- An example of the SQL required to export the legacy format census data 
SELECT [2020 PL Geoheader].SUMLEV, [2020 PL Geoheader].GEOCODE, [2020 PL Geoheader].GEOID, [2020 PL Geoheader].NAME, [2020 PL Geoheader].BASENAME, [2020 PL Segment 1].P0010001
FROM [2020 PL Segment 3] INNER JOIN ([2020 PL Segment 2] INNER JOIN ([2020 PL Segment 1] INNER JOIN [2020 PL Geoheader] ON [2020 PL Segment 1].LOGRECNO = [2020 PL Geoheader].LOGRECNO) ON [2020 PL Segment 2].LOGRECNO = [2020 PL Geoheader].LOGRECNO) ON [2020 PL Segment 3].LOGRECNO = [2020 PL Geoheader].LOGRECNO
WHERE ((([2020 PL Geoheader].SUMLEV)='140'));

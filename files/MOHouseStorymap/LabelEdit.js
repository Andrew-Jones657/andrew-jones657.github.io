// This Arcade expression removes the "MO" 
// abbreviation after each census place name
// label.
var txt = $feature.NAME;
return Left(txt, Count(txt)-3)

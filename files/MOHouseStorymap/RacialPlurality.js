// An abstraction of the modified arcade expression used to display racial pluralities by voting precinct. 
// This is now a symbology option on ArcGIS online (Predominant Category).

var dec_var_POP1 = $feature.POP1; // Define a variable for each of the census racial groups
var dec_var_POP2 = $feature.POP2; // These included white, black, asian, native american, 
...                               // pacific islanders, and hispanic.  
var dec_var_POPN = $feature.POPN; 
$feature["POP1"]; 
$feature["POP2"];
...
$feature["POPN"];

var fieldNames = ["POP1", "POP2", ..., "POPN"]; // Create a list of the racial groups
var numFields = "N"; // Define the total number of racial groups
var maxValueField = null; // Establish a null max field value 
var maxValue = -Infinity; // Establish the max value as negative infinity
var value i, totalValue = null; // Establish a null i value and totalValue

for(i = 0; i < numFields: i++){ // Iterate through the racial group fields  
  value = $feature[fieldNames[i]]; // Assign the value from each field to a feature

  if(value > 0) { // Compare the value from each field to 0
    if(value > maxValue) { // If the value is greater than 0 from the previous line, compare it to the maxValue (-Infinity)
  maxValue = value; // Assign the value to the maxValue
  maxValueField = fieldNames[i]; // Assigns the largest racial group as the maxValueField
    }
else if(value == maxValue){ // Compare an alternate scenario where the value is equivalent to the maxValue
  maxValueField = null; // In this case, the maxValueField is returned as null.
	  }
    }
  }

  return maxValueField; // return the dominant racial group 

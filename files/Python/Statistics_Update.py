## ---------------------------------------------------------------------------
## Statistics.py
## Created on: 2019-4-4
## Last Modified on: 2024-5-7
## Created by: Andrew Jones
## Usage: FunSum(numberList), FunMean(numberList), FunMax(numberlist),
## FunMin(numberList), FunRange(numberList), FunVar(numberList), FunStdDev(numberList)
## Description: This dynamic script calculate the summation of a list of numbers
##              as well as the mean, maximum, minimum, range, variation, and
##              standard deviation.
##              The input list is read from a tool dialog box,
##              while the result is reported in the tool report window.
##              Users have the option of selecting which statistical measures to include. 
## Note: The script was modified from Statistics_Static.py so it can work with
##       an ArcGIS script tool.
## ---------------------------------------------------------------------------

# Import arcpy  and SSUtilities
# These two module must be imported for geoprocessig and I/O with a tool dialog
import arcpy
import SSUtilities

# Sum function
def FunSum(NumList):
    # Calculate sum with a for loop
    theSum = 0                     # assign zero initially so theSum variable is created
    for theNum in NumList:
        theSum = theSum + theNum   # summation of the numbers in the list
    return theSum                  # return the sum

# Mean Function
def FunMean(NumList):
    theSum = FunSum(NumList)        # calls the sum of the numbers in the number list
    theMean = theSum / len(NumList) # divides the sum of the numbers in the number list by the amount of numbers
    return theMean                     # return the mean

# Maxmimum Function
def FunMax(NumList):
    theMax = NumList[0]            # assigns the number list to the function
    for theNum in NumList:
        if theMax < theNum:           # evaluates the max from the number list
            theMax = theNum          

    return theMax                     # return the max

# Minimum Function
def FunMin(NumList):
    theMin = NumList[0]           # assigns the number list to the function
    for theNum in NumList:
        if theMin > theNum:          # evaluates the min from the num list
            theMin = theNum          

    return theMin                    # return the min

# Range Function
def FunRange(NumList):
    theRange = FunMax(NumList) - FunMin(NumList) # subtracts the max from the min

    return theRange                                    # return the range

# Variation Function
def FunVar(NumList):
    theMean = FunMean(NumList)                          # calls the mean
    theSumSqDif = 0                                        # establishes the sum of squared differences
    for theNum in NumList:
        theSumSqDif = theSumSqDif + (theNum - theMean) **2 # evaluates the sum of squared differences
    theVar = theSumSqDif / len(NumList)                 # calculates the variance

    return theVar                                          # return the variance

# Standard Deviation Function
def FunStdDev(NumList):
    theMean = FunMean(NumList)                          # calls the mean
    theSumSqDif = 0                                        # establishes the sum of squared differences
    for theNum in NumList:
        theSumSqDif = theSumSqDif + (theNum - theMean) **2 # evaluates the square root of a sum of squared diffences
    theVar = theSumSqDif / len(NumList)                 # calculates the Variance
    theStdDev = (theVar **(0.5))        # calculates the standard deviation by taking the square root of the variance 
    
    return theStdDev                    # return the standard deviation

# Script tool arguments (Input - global variables)
InitialNumListtAsText = arcpy.GetParameterAsText(0) # Read 1st parameter
SumChecked = arcpy.GetParameterAsText(1) # Read 2nd parameter
MeanChecked = arcpy.GetParameterAsText(2) # Read 3rd parameter
MaxChecked = arcpy.GetParameterAsText(3) # Read 4th parameter
MinChecked = arcpy.GetParameterAsText(4) # Read 5th parameter
RangeChecked = arcpy.GetParameterAsText(5) # Read 6th parameter
VarChecked = arcpy.GetParameterAsText(6) # Read 7th parameter
StdDevChecked = arcpy.GetParameterAsText(7) # Read 8th parameter

# Replace ; with , so the input number list can be used as a list in Python
NumListtAsText = "[" + InitialNumListtAsText.replace(";", ",") + "]"

# Assign true if the 2nd parameter (Sum) is checked
SumChecked = SumChecked == "true"
MeanChecked = MeanChecked == "true"
MaxChecked = MaxChecked == "true"
MinChecked = MinChecked == "true"
RangeChecked = RangeChecked == "true"
VarChecked = VarChecked == "true"
StdDevChecked = StdDevChecked == "true"

# Convert a string, e.g. "[1, 2]", to a list, [1, 2]
NumList = eval(NumListtAsText)

# Local variables
numList = NumList
sumChecked = SumChecked
meanChecked = MeanChecked
maxChecked = MaxChecked
minChecked = MinChecked
rangeChecked = RangeChecked
varChecked = VarChecked 
stddevChecked = StdDevChecked

# Call FunSum function
if sumChecked:                   # if Sum is checked
    thisSum = FunSum(numList)
else:
    print("The Sum was not checked.")

# Call FunMean function
if meanChecked:                  # if Mean is checked
    thisMean = FunMean(numList)
else:
    print("The Mean was not checked.")

# Call FunMax function
if maxChecked:                   # if Maximum is checked
    thisMax = FunMax(numList)
else:
    print("The Maximum was not checked.")

# Call FunMin function
if minChecked:                   # if Minimum is checked
    thisMin = FunMin(numList)
else:
    print("The Minimum was not checked.")

# Call FunRange function
if rangeChecked:                 # if Range is checked
    thisRange = FunRange(numList)
else:
    print("The Range was not checked.")

# Call FunVar function
if varChecked:                   # if Variation is checked
    thisVar = FunVar(numList)
else:
    print("The Variation was not checked.")

# Call FunStdDev function
if stddevChecked:                # if Standard Deviation is checked
    thisStdDev = FunStdDev(numList)
else:
    print("The Standard Deviation was not checked.")
    
# Create Output Text Table
# So the input and output can be reported in the tool report window
header = "Calculate Statistics"
# Report the input list of number first
row1 = [ "The List of Numbers: ", numList ]
total = [ row1 ]


# Report the sum or state of the sum check box
if sumChecked:                   # if Sum is checked
    nextRow1 = [ "Sum: ", thisSum ]
else:
    nextRow1 = [ "The sum checkbox is not checked!" ]

# Report the mean or state of the mean check box
if meanChecked:
    nextRow2 = [ "Mean: ", thisMean ]
else:
    nextRow2 = [ "The mean checkbox is not checked!" ]

# Report the max or state of the max check box         
if maxChecked:
    nextRow3 = [ "Maximum: ", thisMax]
else:
    nextRow3 = [ "The maximum checkbox is not checked!" ]

# Report the min or state of the min check box         
if minChecked:
    nextRow4 = [ "Minimum: ", thisMin]
else:
    nextRow4 = [ "The minimum checkbox is not checked!" ]

# Report the range or state of the range check box         
if rangeChecked:
    nextRow5 = [ "Range: ", thisRange ]
else:
    nextRow5 = [ "The range checkbox is not checked!" ]

# Report the variation or state of the variation check box
if varChecked:
    nextRow6 = [ "Variation: ", thisVar ]
else:
    nextRow6 = [ "The variation checkbox is not checked!" ]

# Report the standard deviation or state of the standard deviation check box
if stddevChecked:
    nextRow7 = [ "Standard Deviation: ", thisStdDev ]
else:
    nextRow7 = [ "The standard deviation checkbox is not checked!" ]

# Add the rows together for each function to form a table
total.append(nextRow1) # Add a new row (Sum)
total.append(nextRow2) # Mean
total.append(nextRow3) # Maximum
total.append(nextRow4) # Minimum
total.append(nextRow5) # Range
total.append(nextRow6) # Variation
total.append(nextRow7) # Standard Deviation

# Construct a table so it can be reported in the tool result window
tableOut = SSUtilities.outputTextTable(total,header=header,pad=1)
arcpy.AddMessage(tableOut)

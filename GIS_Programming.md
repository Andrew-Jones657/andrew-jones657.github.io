<html>
  <head>

  </head>
  <body>
    <p> Welcome to my programming page, here I have various GIS scripts I have developed and used over the years.  </p> <br>

    <h3> Arcade Scripts </h3>
    
    <h3> Python Scripts </h3>

    <h4> Descriptive Statistics Tool </h4>

    <p> This tool is designed to calculate some basic descriptive statistics based off an input list of numbers. </p>

    <p> Static Version </p>

    <pre><code> # Summation function
def FunSum(theNumList):
    # Calculate sum with a for loop
    theSum = 0                     # assign zero initially so theSum variable is created
    for theNum in theNumList:
        theSum = theSum + theNum   # summation of the numbers in the list
    return theSum                  # return the sum

# Mean Function
def FunMean(theNumList):
    theSum = FunSum(theNumList)        # calls the sum of the numbers in the number list
    theMean = theSum / len(theNumList) # divides the sum of the numbers in the number list by the amount of numbers
    return theMean                     # return the mean

# Maxmimum Function
def FunMax(theNumList):
    theMax = theNumList[0]            # assigns the number list to the function
    for theNum in theNumList:
        if theMax < theNum:           # evaluates the max from the number list
            theMax = theNum          

    return theMax                     # return the max

# Minimum Function
def FunMin(theNumList):
    theMin = theNumList[0]           # assigns the number list to the function
    for theNum in theNumList:
        if theMin > theNum:          # evaluates the min from the num list
            theMin = theNum          

    return theMin                    # return the min

# Range Function
def FunRange(theNumList):
    theRange = FunMax(theNumList) - FunMin(theNumList) # subtracts the max from the min

    return theRange                                    # return the range

# Variation Function
def FunVar(theNumList):
    theMean = FunMean(theNumList)                          # calls the mean
    theSumSqDif = 0                                        # establishes the sum of squared differences
    for theNum in theNumList:
        theSumSqDif = theSumSqDif + (theNum - theMean) **2 # evaluates the sum of squared differences
    theVar = theSumSqDif / len(theNumList)                 # calculates the variance

    return theVar                                          # return the variance

# Standard Deviation Function
def FunStdDev(theNumList):
    theMean = FunMean(theNumList)                          # calls the mean
    theSumSqDif = 0                                        # establishes the sum of squared differences
    for theNum in theNumList:
        theSumSqDif = theSumSqDif + (theNum - theMean) **2 # evaluates the square root of a sum of squared diffences
    theVar = theSumSqDif / len(theNumList)                 # calculates the Variance
    theStdDev = (theVar **(0.5))        # calculates the standard deviation by taking the square root of the variance 
    
    return theStdDev                    # return the standard deviation

# To test the function with a hardcoded list of numbers
theNumList = [100.11, 123, 456, 234, 111, 321, -60, 99, 88]

# call each of the functions
testSum = FunSum(theNumList)       # call FunSum function
testMean = FunMean(theNumList)     # call FunMean function 
testMax = FunMax(theNumList)       # call FunMax function
testMin = FunMin(theNumList)       # call FunMin function
testRange = FunRange(theNumList)   # call FunRange function
testVar = FunVar(theNumList)       # call FunVar function
testStD = FunStdDev(theNumList)       # call FunStD function

# prints the results of the functions
print("The Summation of the samples is:",testSum)
print("The mean of the samples is:",testMean)
print("The maximum of the samples is:",testMax)
print("The minimum of the samples is:",testMin)
print("The range of the samples is:",testRange)
print("The variation of the samples is:",testVar)
print("The standard deviation of the samples is:",testStD)
</code></pre>

    <p> Dynamic Version </p>
    

    <h4> Find and Save Unique Values in a Table </h4>


    <h3> Setting up a Simple Instance of ArcGIS Javascript API </h3>


    <p>This is the <code>Panel</code> constructor:</p>
    <pre><code>function Panel(element, canClose, closeHandler) {
      this.element = element;
      this.canClose = canClose;
      this.closeHandler = function () { if (closeHandler) closeHandler() };
    }</code></pre>
    
    <py-script>
      print("Hello World")
    </py-script>
  </body>
</html>


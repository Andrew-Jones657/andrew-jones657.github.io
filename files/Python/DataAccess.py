##----------------------------------------------------------------------
## DataAccess.py
## Created on: 4-21-2019
## Last Modified on: 5-08-2024
## Created by: Andrew Jones
## Usage: DataAccess(featureLayer), DataAccess([Field]),
## DataAccess(Output Dbase file)
## Description: This script is designed to extract a single field's values
##               from a  and then  
##              list the first occurence of each value in a .dbf file. 
## Note: This is a dynamic script modified from a static script
##       so it can run as an ArcGIS script tool. 
## ----------------------------------------------------------------------
import arcpy
import SSUtilities
# Set the environmental options 
from arcpy import env # Bring in the workspace
arcpy.env.overwriteOutput = True
arcpy.env.addOutputsToMap = True
# Script tool arguments (Input - Global variables) 
featureLayer = arcpy.GetParameterAsText(0) # establish the user selected feature class being accessed
identifiedField = arcpy.GetParameterAsText(1) # establish the user selected field being accessed 
outputTable = arcpy.GetParameterAsText(2) # establish the user selected output folder name for the dbase table 
# Set the workspace of the feature layer to be dynamic  
desc = arcpy.Describe(featureLayer)
workSpace = r"" + desc.path
# The field for which the unique values will be extracted
fieldList = [identifiedField]
# Set the Workspace of the output folder for the Dbase file 
tableFolder = arcpy.Describe(outputTable)
outputFolder = r"" + tableFolder.path
# initiate the cursor that will access the data
searchCursor = arcpy.da.SearchCursor(featureLayer, identifiedField) 
# An empty list that will hold the values
uniqueValueList = [] 
# Iterate through the rows in the "roads.shp" feature class 
# and append only the values that appear for the first time
for row in searchCursor:  
    if not row[0] in uniqueValueList: 
        uniqueValueList.append(row[0]) 
# Create a new table 
arcpy.management.CreateTable(outputFolder, "uniquevalue.dbf") 
# The name of the .dbf table that will store unique values
dbfTable = outputFolder + '/' + 'uniquevalue.dbf' 
# The name of the field that contains the unique values
newField = "UniqueValues"
# Add the new field to the .dbf file
arcpy.AddField_management(dbfTable, newField, "TEXT") 
# Delete the empty default field in the .dbf file 
arcpy.DeleteField_management(dbfTable, ["FIELD1"]) 
# Insert the unique values into the .dbf file
insertCursor = arcpy.da.InsertCursor(dbfTable, [newField]) 
for uniqueValue in uniqueValueList:
     insertCursor.insertRow([uniqueValue]) 
# Create Output Text Table
# So the input and output can be reported in the tool report window
header = "Create Unique Value Dbase file"
# Report the input list of parameters first
row1 = [ "The Feature Layer: ", featureLayer ]
row2 = [ "The Selected Field: ", identifiedField ]
row3 = [ "The Output Dbase File Name: ", outputTable ]
total = [ row1, row2, row3 ]
# Use a for loop to display the unique values
# and sort them from least to greatest 
for uniqueValue in uniqueValueList:
    total.append([uniqueValue])
    uniqueValueList.sort()
# Construct a table so it can be reported in the tool result window
tableOut = SSUtilities.outputTextTable(total,header=header,pad=1)
arcpy.AddMessage(tableOut)
# Delete the Cursors, rows, and dbfTable to unlock the file 
del searchCursor
del row
del insertCursor

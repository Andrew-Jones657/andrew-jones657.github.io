##----------------------------------------------------------------------
## AggPopEstimator.py
## Created on: 5-14-2024
## Last Modified on: 5-15-2024
## Created by: Andrew Jones
## Usage: AggPopEstimator(blockLayer), AggPopEstimator(aggregateLayer),
## AggPopEstimator(populationField), AggPopEstimator(blockJoinField), AggPopEstimator(aggregateJoinField)
##              In order to use this script, the user needs to have a census block layer 
##              containing population data. The user must also have a larger layer that will 
##              act as the aggregation layer. 
##              Additionally, the user needs to identify the desired population field as 
##              well as the fields used to join the table to the aggregate layer. Typically 
##              this is the same field as the block field. Remember to setup the parameters or this tool will not function!
##              So far, this tool has successfully functioned using census blocks, block groups, tracts, and zip codes. 
## Description: This script is designed to automate an areal proportion analysis
##              and aggregate the population values of census blocks to larger geographic units. 
##              The results are stored in a dBase table which can then be joined to the larger geographic unit.
##              Areal proportion analysis assumes that the population within census blocks is evenly dispersed.
## Note: This tool may result in an error message if it is run more than once while the aggregate table 
##       is on the active ArcGIS Pro Table of Contents. Remove the aggregate table from the Table of Contents to avoid this.
##       Additionally, this tool was designed to work with census boundary files. Using it on other boundaries may create unexpected
##       results. 
## ----------------------------------------------------------------------
import arcpy
import SSUtilities
from sys import argv

# Set the environmental options 
from arcpy import env # Bring in the workspace
arcpy.env.overwriteOutput = True
arcpy.env.addOutputsToMap = True

# Script tool arguments (Input - Global variables)
blockLayer = arcpy.GetParameterAsText(0)
aggregateLayer = arcpy.GetParameterAsText(1)
populationField = arcpy.GetParameterAsText(2)
blockJoinField = arcpy.GetParameterAsText(3)
aggregateJoinField = arcpy.GetParameterAsText(4)

# Set the workspace of the feature layer to be dynamic
desc = arcpy.Describe(blockLayer)
workSpace = r"" + desc.path

# Make the feature layer for the aggregate layer
Aggregate_Layer_Feature_Layer = "aggregateLayer"
arcpy.management.MakeFeatureLayer(in_features=aggregateLayer, out_layer=Aggregate_Layer_Feature_Layer)

# Add the area field to the block field
Block_with_Area_Field = arcpy.management.AddField(in_table=blockLayer, field_name="Area", field_type="DOUBLE", field_is_required="NON_REQUIRED")[0]

# Calculate the added area field 
Block_Filled_Area_ = arcpy.management.CalculateField(in_table=Block_with_Area_Field, field="Area", expression="!shape.area@squaremiles!", expression_type="PYTHON_9.3")[0]

# Intersect the block and aggregate layers 
Aggregate_Block_Intersect_ = workSpace + "\\" + "Block_Intersect" 
arcpy.analysis.Intersect(in_features=[[Block_Filled_Area_, ""], [Aggregate_Layer_Feature_Layer, ""]], out_feature_class=Aggregate_Block_Intersect_)

# Add the new area field to the intersected layer
Aggregate_Block_Intersect_Empty_New_Area_ = arcpy.management.AddField(in_table=Aggregate_Block_Intersect_, field_name="New_Area", field_type="DOUBLE")[0]

# Calculate the new area field  
Aggregate_Block_Intersect_Populated_Area_ = arcpy.management.CalculateField(in_table=Aggregate_Block_Intersect_Empty_New_Area_, field="New_Area", expression="!shape.area@squaremiles!", expression_type="PYTHON_9.3")[0]

# Add the new population field to the intersected layer
Aggregate_Block_Intersect_Empty_New_Pop_ = arcpy.management.AddField(in_table=Aggregate_Block_Intersect_Populated_Area_, field_name=populationField, field_type="LONG")[0]

# Use Areal Proportion to calculate the new population 
Aggregate_Block_Intersect_Filled_Population_ = arcpy.management.CalculateField(in_table=Aggregate_Block_Intersect_Empty_New_Pop_, field=populationField, expression=f"[{populationField}] * [New_Area] / [Area]", expression_type="VB")[0]

# Run summary statistics to aggregate the population to the aggregate layer
Aggregate_Population_Table = workSpace + "\\" + "AGG_TABLE" 
arcpy.analysis.Statistics(in_table=Aggregate_Block_Intersect_Filled_Population_, out_table=Aggregate_Population_Table, statistics_fields=[[populationField, "SUM"]], case_field=[aggregateJoinField])

# Join the table to the aggregate layer
Aggregate_Population_Layer_ = arcpy.management.AddJoin(in_layer_or_view=Aggregate_Layer_Feature_Layer, in_field=blockJoinField, join_table=Aggregate_Population_Table, join_field=aggregateJoinField, join_type="KEEP_ALL")[0] 

# Create Output Text Table
# So the input and output can be reported in the tool report window
header = "Create Unique Value Dbase file"
# Report the input list of parameters first
row1 = [ "The Block Layer: ", blockLayer ]
row2 = [ "The Aggregate Layer: ", aggregateLayer  ]
row3 = [ "The Output Dbase File Name: ", Aggregate_Population_Table ]
total = [ row1, row2, row3 ]

# Construct a table so it can be reported in the tool result window
tableOut = SSUtilities.outputTextTable(total,header=header,pad=1)
arcpy.AddMessage(tableOut)

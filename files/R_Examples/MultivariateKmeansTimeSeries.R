library(ggplot2)
library(reshape)

# Read in the transposed cluster dataset. It only contains the Date and mean center for each cluster (2 clusters, 36 observations)
Kmeans_Data <- read.csv("path_to_transposed_dataset") 

# Save the mean center data under a different variable  
Kmeans_Data_partial <- Kmeans_Data[, 2:3]

# Format the date by month-day-year so that it can be used with time series
Kmeans_Data_date <- mdy(Kmeans_Data[,1])


# Combine the date and observations. The dates should now work with time series
Kmeans_Data_correct <- cbind(Kmeans_Data_date, Kmeans_Data_partial)


# Coerce the data into long format, which is required for time series (requires "reshape" library)

Kdata_long <- melt(Kmeans_Data_correct, id.vars = "Kmeans_Data_date")
head(Kdata_long)


# Use ggplot to create a time series graph where each cluster has a different color (requires "ggplot2" library)  

ggplot(Kdata_long, 
       aes(x = Kdata_long$Kmeans_Data_date, y = value, col = variable)) + 
       geom_line() + 
       geom_point() + 
       labs(title="Time Series Plot of Drought K-Mean Clusters, July 1998 - June 2001", x="Date", y="Cluster Mean Center") +
       theme_minimal() 

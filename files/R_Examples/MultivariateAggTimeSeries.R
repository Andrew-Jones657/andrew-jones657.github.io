  library(ggplot2)
  library(reshape)


  # Read in the transposed cluster dataset. It only contains the Date and mean center for each cluster (36 observations)
  cluster_center_t_clean <- read.csv("path_to_transposed_dataset")

  # Save the mean center data under a different variable  
  cluster_center_t_clean_partial <- cluster_center_t_clean[, 2:5]  

  # Format the date by month-day-year so that it can be used with time series
  cluster_center_t_clean_date <- mdy(cluster_center_t_clean[,1])
  
  # Combine the date and observations. The dates should now work with time series
  cluster_center_t_correct <- cbind(cluster_center_t_clean_date, cluster_center_t_clean_partial)

  # Coerce the data into long format, which is required for time series (requires "reshape" library)
  data_long <- melt(cluster_center_t_correct, id.vars = "cluster_center_t_clean_date")
  head(data_long) 


  # Use ggplot to create a time series graph where each cluster has a different color (requires "ggplot2" library)  
  ggplot(data_long, 
         aes(x = cluster_center_t_clean_date, y = value, col = variable)) + 
         geom_line() + 
         geom_point() + 
         labs(title="Time Series Plot of Drought Cluster Mean Centers, July 1998 - June 2001", x="Date", y="Cluster Mean Center") +
         theme_minimal()

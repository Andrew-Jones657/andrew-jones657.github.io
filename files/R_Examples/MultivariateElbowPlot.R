library(ggplot2)
library(factoextra)
library(tidyverse)

# Read in the drought dataset. It contains unique identifiers, names, lat-lon values, and the drought anomalies for each month (Jul 98 - Jun 01) 
drought.data.raw <- read.csv("path_to_transposed_dataset")


# Remove unncessary information so the data can be scaled 
trim_matrix <- drought.data.raw[, !colnames(drought.data.matrix) %in% c("FID_", "CDN", "LON", "LAT" )]

# Transform the location name into the row name labels
m <- trim_matrix %>% remove_rownames %>% column_to_rownames(var="NAME")

# Scale the data 
m_scale <- scale(m)

# Create an elbow method plot using the factoextra library
fviz_nbclust(m_scale, kmeans, method = "wss") +
  geom_vline(xintercept = 4, linetype = 2) + # add line for better visualisation
  labs(subtitle = "Elbow method") # add subtitle

library(ggplot2)
library(factoextra)
library(tidyverse)
library(parameters)
library(cluster)

# Read in the drought dataset. It contains unique identifiers, names, lat-lon values, and the drought anomalies for each month (Jul 98 - Jun 01) 
drought.data.raw <- read.csv("path_to_transposed_dataset")


# Remove unncessary information so the data can be scaled 
trim_matrix <- drought.data.raw[, !colnames(drought.data.matrix) %in% c("FID_", "CDN", "LON", "LAT" )]

# Transform the location name into the row name labels
m <- trim_matrix %>% remove_rownames %>% column_to_rownames(var="NAME")

# Scale the data 
m_scale <- scale(m)

# Use silhouette plot to confirm choice: 2 = 0.41, 3 = 0.36, 4 = 0.28, 5 = 0.24, 6 = 0.26, 7 = 0.25, 8 = 0.27
km_res <- kmeans(m_scale, centers = 2, nstart = 20)

# Create a cluster plot using PCA 

fviz_cluster(km_res, m_scale)


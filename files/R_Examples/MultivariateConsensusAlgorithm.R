library(ggplot2)
library(factoextra)
library(tidyverse)
library(parameters)

# Read in the drought dataset. It contains unique identifiers, names, lat-lon values, and the drought anomalies for each month (Jul 98 - Jun 01) 
drought.data.raw <- read.csv("path_to_transposed_dataset")


# Remove unncessary information so the data can be scaled 
trim_matrix <- drought.data.raw[, !colnames(drought.data.matrix) %in% c("FID_", "CDN", "LON", "LAT" )]

# Transform the location name into the row name labels
m <- trim_matrix %>% remove_rownames %>% column_to_rownames(var="NAME")

# Scale the data 
m_scale <- scale(m)

# Consensus based algorithm: The choice of 2 clusters is supported by 11 (36.67%) methods out of 30 
# (Elbow, Silhouette, Ch, CCC, Cindex, DB, Duda, Pseudot2, Beale, PtBiserial, Mcclain).

n_clust <- n_clusters(m_scale,
                      package = c("easystats", "NbClust", "mclust"),
                      standardize = FALSE
)
n_clust

plot(n_clust)

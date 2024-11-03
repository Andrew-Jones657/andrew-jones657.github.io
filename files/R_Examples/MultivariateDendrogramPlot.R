library(factoextra)
library(ggplot2)
library(ggdendro)
library(cluster)

## Read in the drought dataset. It contains unique identifiers, names, lat-lon values, and the drought anomalies for each month (Jul 98 - Jun 01) 
drought.data.raw <- read.csv("path_to_dataset")

## Transpose drought data

drought.data <- t(drought.data.raw)

## Ensure data is in matrix form
drought.data.matrix <- as.matrix(drought.data)

## Save the city names 
city.names<-trim_matrix[, 1]

## Scale the values of the drought dataset to standardize it

z <- drought.data.matrix[,-c(1,1)]
means <- apply(z,2,mean)
sds <- apply(z,2,sd)
drought.matrix.scaled <- scale(z,center=means,scale=sds)

## Compute the dissimilarity matrix
dist.matrix <- dist(drought.matrix.scaled, method="euclidean")

## Create agglomerative clustering data with Ward D2 method
hclust.data <- hclust(dist.matrix, method="ward.D2")

## Assign the weather station names to the dataset
hclust.data$labels <- city.names

## Create the dendrogram using the ggdendro library
 dendro.data <- dendro_data(hclust.data)
 clusters <- cutree(hclust.data, k=4)                    # find 4 clusters

## Create a data frame to preserve the names and colors of the grouped clusters
 cluster.df <- data.frame(label=names(clusters), cluster=factor(clusters))

## dendr[["labels"]] has the labels, merge with clust.df based on label column
 dendro.data[["labels"]] <- merge(dendro.data[["labels"]],cluster.df, by="label")

## plot the dendrogram; note use of color=cluster in geom_text
 ggplot() + 
   geom_segment(data=segment(dendro.data), aes(x=x, y=y, xend=xend, yend=yend)) + 
   geom_text(data=label(dendro.data), aes(x, y, label=label, hjust=0, color=cluster), 
            size=3) +
   coord_flip() + scale_y_reverse(expand=c(0.2, 0)) + 
   geom_hline(yintercept=18, linetype=2) +
   labs(title = "Dendrogram of Cumulative Drought Values in Kentucky, July 1998 - June 2001") +
   theme(axis.line.y=element_blank(),
         axis.ticks.y=element_blank(),
         axis.text.y=element_blank(),
         axis.title.y=element_blank(),
         panel.background=element_rect(fill="white"),
         panel.grid=element_blank())

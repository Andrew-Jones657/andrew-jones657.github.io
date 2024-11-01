## Look at Quality of K means partition

# Read in the drought dataset. It contains unique identifiers, names, lat-lon values, and the drought anomalies for each month (Jul 98 - Jun 01) 
drought.data.raw <- read.csv("path_to_transposed_dataset")


# Remove unncessary information so the data can be scaled 
trim_matrix <- drought.data.raw[, !colnames(drought.data.matrix) %in% c("FID_", "CDN", "LON", "LAT" )]

# Transform the location name into the row name labels
m <- trim_matrix %>% remove_rownames %>% column_to_rownames(var="NAME")

# Scale the data 
m_scale <- scale(m)

## Model the data with 2 groups

model <- kmeans(m_scale, centers = 2)

model$cluster

Drought_kmeans_2clusters <- data.frame(m_scale, 
  cluster = as.factor(model$cluster)
 )

head(Drought_kmeans_2clusters)

# Between sum of squares = 33160.46
(BSS <- model$betweenss)

# Total Sum of Squares = 60429.89
(TSS <- model$totss)

# Partition formula = 46.341006 (A higher quality means a higher explained percentage)
BSS / TSS * 100

## Model the data for several initial centers and better stability:

model2 <- kmeans(m_scale, centers = 2, nstart = 10)
100 * model2$betweenss / model2$totss

## Model the data with 3 groups

model3 <- kmeans(m_scale, centers = 3)


# Yields 60.31649
BSS3 <- model3$betweenss
TSS3 <- model3$totss
BSS3 / TSS3 * 100

## Model the data with 4 groups

model4 <- kmeans(m_scale, centers = 4)


# Yields 67.4345
BSS4 <- model4$betweenss
TSS4 <- model4$totss
BSS4 / TSS4 * 100

## Model the data with 5 groups

model5 <- kmeans(m_scale, centers = 5)


# Yields 69.81098
BSS5 <- model5$betweenss
TSS5 <- model5$totss
BSS5 / TSS5 * 100


## Model the data with 6 groups

model6 <- kmeans(m_scale, centers = 6)

# Yields 76.10357
BSS6 <- model6$betweenss
TSS6 <- model6$totss
BSS6 / TSS6 * 100

## Model the data with 7 groups

model7 <- kmeans(m_scale, centers = 7)

# Yields 79.09898
BSS7 <- model7$betweenss
TSS7 <- model7$totss
BSS7 / TSS7 * 100

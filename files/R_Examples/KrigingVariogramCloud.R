library("gstat")   # geostatistics
library("sf")      # spatial vector data

semi.raw <- read.csv("path_to_dataset")

semi_spatial <- st_as_sf(semi.raw, coords = c("LON", "LAT"), crs = 6318) # Create a spatial format dataset

head(semi_spatial)

mapview(semi_spatial['JUN99'])

semi_spatial.vc <- variogram(JUN99 ~ 1, semi_spatial, cutoff=600, cloud = TRUE) # Create a variogram cloud object with a cutoff of 600 km

plot(semi_spatial.vc, 
     ylab=expression(gamma), 
     pch=19, 
     col="royalblue2", 
     xlab = "Separation distance (km.)", 
     main = "Semivariogram Cloud of Drought Deficiencies, Jun 1999",
     sub="Semivariogram Cloud prepared by Andrew Jones") 

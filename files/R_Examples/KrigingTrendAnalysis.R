## Libraries for 3D plot
library(rgl)
library(plot3D)
library(plot3Drgl)

## Add grids to 
source('http://www.sthda.com/sthda/RDoc/functions/addgrids3d.r')

Trend_Data <- read.csv("path_to_dataset")


## Assign variables from Trend_Data
LON <- Trend_Data[,4]
LAT <- Trend_Data[,5]
JUN99 <- Trend_Data[,17]
Stations <- Trend_Data[,3]

## 3D Scatterplot of drought values in June 1999
scatter3D(LON, 
          LAT, 
          JUN99,
          labels = Trend_Data$NAME,
          bty="b2",
          colkey=TRUE,
          col=ramp.col(c("red", "blue")),
          type="h",
          pch=16,
          cex=0.5,
          phi=30,
          theta=30,
          main="Scatterplot of Cumulative Drought Anomalies in Kentucky, June 1999",
          xlab="Longitude",
          ylab="Latitude",
          zlab="Drought Intensity (in.)") 


## Create a quadratic regression model for Longitude and JUNE1999 drought values

fit<- lm(JUN99 ~ poly(LON, 2, raw=TRUE))
plot(LON, JUN99, pch=20, col="gray4", main="Trend Analysis of Drought Anomalies in Kentucky by Longitude", ylab="Drought Intensity (in.) ") +
  curve(predict(fit, newdata=data.frame(LON=x)), col="chartreuse4", lwd=2, add=T)
text(LON, JUN99, labels = Trend_Data$NAME, cex=0.45, pos=3)
grid(nx = NULL, ny = NULL, lty=2, col="grey70", lwd=2)


## Create a quadratic regression model for Latitude and JUNE1999 drought values

fit2 <- lm(JUN99 ~ poly(LAT, 2, raw=TRUE))
plot(LAT, JUN99, pch=20, col="gray4", main="Trend Analysis of Drought Anomalies in Kentucky by Latitude", ylab="Drought Intensity (in.) " ) +
  curve(predict(fit2, newdata=data.frame(LAT=x)), col="royalblue3", lwd=2, add=T)
text(LAT, JUN99, labels = Trend_Data$NAME, cex=0.45, pos=3)
grid(nx = NULL, ny = NULL, lty=2, col="grey70", lwd=2)

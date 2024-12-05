library(ggplot2)
library(tidyverse)
library(extrafont)




drought_data <- read.csv("path_to_dataset")

fonts()
loadfonts()
font_import()
windowsFonts()


h <- drought_data %>% # Use a pipeline to pass and filter June 99 drought values into a histogram
  filter( JUN99 < 10) %>%
  ggplot( aes(x=JUN99)) +
    geom_histogram( bins=8, fill="#69b3a2", color="#e9ecef", alpha=0.9) +
    labs(
      title = "Histogram of Kentucky Cumulative Drought Anomalies",
      subtitle = "July 1998 - June 1999",
      caption = "Histogram prepared by Andrew Jones",
      x = "Cumulative Drought Values (in.)",
      y = "Frequency") +
	theme(text=element_text(
	family="Arial", 
	face="bold", 
	size=12)) + 
	theme(panel.grid.major = element_blank(), 
	panel.grid.minor = element_blank(),
	panel.background = element_blank(), 
	axis.line = element_line(colour = "black"))

h

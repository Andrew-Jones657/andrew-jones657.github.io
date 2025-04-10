library(ggplot2)


drought_data <- read.csv("path_to_dataset")

shapiro.test(drought_data$JUN99)

ggplot(drought_data, aes(sample=JUN99)) + # Create a QQ plot with ggplot
	stat_qq(fill="#87AC99", color="#87AC99", alpha=0.9) +
	stat_qq_line() +
	theme(text=element_text(
	family="Arial", 
	face="bold", 
	size=12)) +
	labs(
      title = "QQPlot of Kentucky Cumulative Drought Anomalies",
      subtitle = "July 1998 - June 1999",
      caption = "QQPlot prepared by Andrew Jones",
      x = "Theoretical",
      y = "Cumulative Drought Values (in.)") +
	annotate(
	'text', 
	x = 1, 
	y = -17,
	label = "Shapiro-Wilk Normality Test: W=0.99647, p-value = 0.1209",
	fontface = 'bold', 
	size = 4.5) +	
	theme(panel.grid.major = element_blank(), 
	panel.grid.minor = element_blank(),
	panel.background = element_blank(), 
	axis.line = element_line(colour = "black"))




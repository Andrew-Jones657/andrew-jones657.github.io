<html>
  
<head>
    <meta charset="utf-8" />
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <style>
        html,
        body { 
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        }

  figure figcaption {
  text-align: center; 
         }
  
  h3{
  text-align: center;
  }
  
         
  #viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  min-height: 450px;
  mid-width: 650px;
  border: 1px solid #444444;
        }
        #myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
        }
    
  #myImg:hover {
  opacity: 0.7;
        }
.modal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  padding-top: 100px;
  /* Location of the box */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9);
  /* Black w/ opacity */
}

.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-height: 650px;
  max-width: 900px;
}

#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

.modal-content,
#caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
}


  </style>
  </head>

  <body>

  <h1 style="text-align:center;"> Downloading and Processing US Census Data for GIS Implementation </h1> <br>

  <p> GIS implementation of US Census data allows analysts to map and visualize demographic trends such as population distribution, age demographics, and socioeconomic status across different geographic areas. By integrating Census data into GIS platforms, urban planners can make informed decisions      regarding infrastructure development, resource allocation, and community outreach initiatives. This spatial data helps governments and organizations understand spatial patterns and make evidence-based policy decisions tailored to specific localities. </p> <br>

  <p> In this tutorial, census files for Boone County, Missouri, including boundary and table data, will be downloaded and processed. These files will contain demographic information at the census tract level, such as total population and breakdowns by racial and ethnic groups. Both files will need to be processed and joined together in order to map the demographic data.  </p> <br>

  <p> U.S. Census data is structured hierarchically. At the smallest geographic scale are census blocks, which are defined by human-made and natural features, such as streets, roads, railroads, streams, and other visible physical and cultural landmarks. Above census blocks are block groups, census tracts, counties, states, divisions, regions, and, at the top of the hierarchy, the entire nation. Each of these higher-level geographic units can be disaggregated into smaller units, down to the census block level. The standard hierarchy, along with alternative offshoots, is depicted in Figure 1 below. </p> <br>

  
  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/0ptopke.jpeg" alt="Census Geography Hierarchy" style="width:100%;max-width:625px">
  <figcaption> Figure 1. The Hierarchy of Census Geographies (US Census Bureau, 2021)  </figcaption>
  </figure> <br>

  <h3> Searching for Population Tables at the Census Tract Level </h3> <br>

  <p> The U.S. Census data website can be accessed <a href="https://data.census.gov/">here</a>. Since this table will be used in GIS software, the search criteria must be set up carefully, as the U.S. Census provides many similarly named datasets. The "advanced search" option will be utilized to apply several filters in order to obtain the specific dataset required. To begin, “advanced search” should be selected under the main search bar (Figure 2). </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/BusE2V2.jpeg" alt="US Census Data" style="width:100%;max-width:625px">
  <figcaption> Figure 2. The US Census Data Website  </figcaption>
  </figure> <br>

  <p> On the left side of the webpage, various subjects are listed through which the search can be refined (Figure 3). </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/mT8nRO2.jpeg" alt="US Census Advanced Search" style="width:100%;max-width:625px">
  <figcaption> Figure 3. The Advanced Search Pane on the US Census Data Website  </figcaption>
  </figure> <br>

  <p> Filters can now be applied to the data. Starting with “Geographies,” “Census Tract” should be clicked, then “Missouri” selected from the popup list, followed by “Boone County,” and finally, “All Census Tracts within Boone County, Missouri” should be checked. This will limit the dataset to census tracts within Boone County, Missouri. </p> <br>

  <p> Next, under “Topics,” “Populations and People” should be selected. A list of ethnic and racial groups will appear, and “Race and Ethnicity” should be checked. This will enable the option to map specific racial or ethnic groups.  </p> <br>

  <p> Under “Surveys,” several different options will be presented. To map the total population in 2020, data from an official census release must be used. “Decennial Census” should be selected, followed by “Demographic and Housing Characteristics” (while “Demographic Profile and Redistricting Data PL 94-171” could also be used for this tutorial, the next steps assume “Demographic and Housing Characteristics” is chosen).  </p> <br>

  <p> Under “Years,” “2020” should be selected for the 2020 U.S. Census data. At this point, the results should resemble those shown in Figure 4 below. </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/wwVNZch.jpeg" alt="US Census Advanced Search" style="width:100%;max-width:625px">
  <figcaption> Figure 4. US Census Advanced Search Filters Input  </figcaption>
  </figure> <br>

  <p> The top option, “P9,” is suitable for the purpose of this tutorial (Figure 4). This dataset includes information on whether the population is Hispanic or Latino, or not Hispanic or Latino, as well as a racial breakdown for each of these categories. It is important to note that, for census data, Hispanic or Latino is considered an ethnicity, while groups such as Black or African American, Asian, American Indian or Alaska Native, Native Hawaiian or Pacific Islander, and White are classified as racial groups.  </p> <br>

  <p> The search menu should be collapsed, and the table reviewed. It is important to download the table in a specific manner. The .zip, .csv, and .xlsx download options directly above the table should not be used. Instead, under the results menu, the “P9” checkbox should be selected, and then the “download” option should be clicked above it. Downloading the table in this way will preserve the “GEOID” field, which serves as the unique identifier to join the dataset with the census tract boundaries.   </p> <br>

  <p> With the census dataset file downloaded, the next step is to download the census tract boundaries before processing the dataset.  </p> <br>

  <h3> Finding GIS Boundary Files at the Census Tract Level with the US Census Web Interface </h3> <br>

  <p> With the census dataset obtained, the corresponding 2020 census tract TIGER (Topologically Integrated Geographic Encoding and Referencing system) Lines can be downloaded <a href="https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html"> here</a> (Figure 5). </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/yyEckxw.jpeg" alt="US Census Tiger Lines" style="width:100%;max-width:625px">
  <figcaption> Figure 5. US Census TIGER Line Website  </figcaption>
  </figure> <br>

  <p> The year 2023 should be selected for the boundary file, although the 2020-2022 vintages would also work without any issues. The data can be downloaded via either the web interface or the FTP archive. Since the web interface is more user-friendly, it is recommended to choose that option first. In the web interface, there are dropdown boxes for selecting the year and layer type. Ensure that 2023 is selected for the year, and that "Census Tracts" is chosen for the layer, as shown in Figure 6 below.   </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/h6e0Fp5.jpeg" alt="US Census Tiger Line Web Interface" style="width:100%;max-width:625px">
  <figcaption> Figure 6. Using the Web Interface to Find 2023 Census Tract Boundaries  </figcaption>
  </figure> <br>


  <p> <em> It is important to select census tracts from 2019 or later, as the boundaries of census tracts, block groups, and blocks can and do change between decades. Tract boundaries may be adjusted, split to create new tracts, or merged to form larger tracts in order to reflect shifts in population and urban development.   </em> </p> <br>

  <p> Once the selections have been made, "Submit" should be clicked to go to the census tract download page. Unfortunately, all census tracts in Missouri must be downloaded. After downloading the zip file, it should be extracted at the designated location, and the shapefile can then be added to ArcGIS Pro or any other GIS software of choice. To provide a visual overlay of Boone County’s location within Missouri, the Missouri counties shapefile can be downloaded from the same web interface or quickly added from the ArcGIS Living Atlas. </p> <br>

  <h3> Finding GIS Boundary FIles at the Census Tract Level with the US Census FTP </h3> <br>

  <p> The File Transfer Protocol (FTP) archive is another method for obtaining census boundary files. While it can be faster than the web interface, it is more technical in nature. To use the FTP archive, return to the main webpage of the TIGER files site and select "FTP archive" (Figure 7).  </p> <br>
  
  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/53tUw8O.jpeg" alt="US Census Tiger Line FTP" style="width:100%;max-width:625px">
  <figcaption> Figure 7. Using the Census TIGER Lines FTP  </figcaption>
  </figure> <br>
  
  <p> Since census tracts are needed, a directory reflecting that name must be located. Scrolling down, the "TRACT/" folder should be selected. This will lead to a list of zip files, each beginning with "tl_2023_xx_tract.zip." The "xx" represents the state's Federal Information Processing Standards (FIPS) code. These codes are used by the Census Bureau to assign a unique identifier to each geographic entity. The FIPS codes become longer for smaller, higher-scale geographic units, such as census blocks, which is why having a dataset file with the GEOID field was important. A FIPS code lookup guide is provided by the FCC <a href="https://transition.fcc.gov/oet/info/maps/census/fips/fips.txt"> here</a>. According to the guide, the FIPS code for Missouri is 29, so the zip file corresponding to that code should be downloaded. On the FTP site, "tl_2023_29_tract.zip" should be clicked to initiate the download. </p> <br>


  <h3> Processing the US Census Tract Dataset to make it Compatible with GIS </h3> <br>

  <p> The census dataset spreadsheet that was downloaded earlier should be opened. It should resemble Figure 8 below. Note that there are two header rows, with the second serving as metadata for the first. Additionally, a GEOID field is present, which is essential for joining the dataset to the census tract boundaries. </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/uHZOpz7.jpeg" alt="US Census Data Raw" style="width:100%;max-width:625px">
  <figcaption> Figure 8. The Raw Census Dataset  </figcaption>
  </figure> <br>

<p> The second header should be deleted; however, before doing so, the columns in the first header must be renamed. In Figure 9 below, several columns in the main header have been renamed. </p> <br>



  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/EWqBHjR.jpeg" alt="US Census Data Processed" style="width:100%;max-width:625px">
  <figcaption> Figure 9. The Processed Census Dataset  </figcaption>
  </figure> <br>

  <p> Next, the census dataset should be added to ArcGIS Pro so that it appears on the same map as the census tract boundaries. The dataset must then be exported to the geodatabase to enable editing. At this point, the census dataset can be joined to its tract boundaries. "GEOIDFQ" should be used as the join field from the census tract boundaries, and "GEO_ID" should be used as the join field from the census dataset. The fields used for the join are shown in Figure 10 below. </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/ABdp77Y.jpeg" alt="US Census Join" style="width:100%;max-width:625px">
  <figcaption> Figure 10. Joining the Census Tract Dataset to the Census Tract Boundaries  </figcaption>
  </figure> <br>

  <p> With the two datasets joined, the layer should be exported to the geodatabase to save it. At this point, the census data is ready to be mapped. For this tutorial, the total population will be quickly mapped. Figure 11 below shows a simple example of a choropleth map, where the percentage of the total population within each census tract is displayed.  </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/3Kl75Zs.jpeg" alt="US Census Chloropleth" style="width:100%;max-width:625px">
  <figcaption> Figure 11. A Choropleth Map Created with 2020 US Census Data  </figcaption>
  </figure> <br>

  <h3> Using Older Census Datasets and the American Community Survey </h3> <br>

  <p> The 2020 census data has the benefit of being easier to use in GIS software. Older census datasets, however, require an additional processing step. To demonstrate this, the same census data for Boone County should be downloaded, but for 2010 instead of 2020. The process for obtaining the census dataset is similar to that of the 2020 data, but instead of searching for "Demographic and Housing Characteristics" or "2020," "DEC Summary File 1" and "2010" should be selected. The "Summary File" designation is used for older data (2000–2010). Obtaining the census boundary files is straightforward—simply repeat the previous steps and select a year between 2011 and 2019.  </p> <br>

  <p> The 2010 census dataset is structured similarly to the 2020 dataset, so it should be processed in the same manner as before. Both the 2010 census data and the 2010 census tract boundaries should be added to ArcGIS Pro. However, when attempting to join the two datasets, it will be noticed that the “GEOIDFQ” field is missing from the 2010 census tract boundaries, unlike in the 2020 boundaries. </p> <br>

  <p> Upon comparing the attribute tables of both layers, it will be observed that the “GEO_ID” text field in the 2010 census dataset contains the correct entries to join the two layers, though it is embedded in a larger string prefixed with “1400000US.” To correct this, a new field called “GEOID10” should be created in the census dataset table. The Calculate Field tool should then be used with Arcade, and in the field calculation, the expression RIGHT(GEOID, 11) should be applied. This will preserve the 11 rightmost characters of the field, making it identical to the "GEOID" in the census tract boundaries (Figure 12).  </p> <br>

  <em> As a side note, the GEOID identifier is a FIPS code, similar to the one used to specify the Missouri census tract dataset on the FTP site (notice that each census tract starts with "29," which refers to Missouri). For reference, census block groups have a unique 12-digit FIPS code, while census blocks have a unique 15-digit FIPS code.  </em> <br>

  <p> In addition to the census data, there is also the American Community Survey (ACS), which, as the name implies, is a continuous survey administered to random members of the population to collect detailed demographic information. The heading for the ACS appeared earlier ("Surveys") when searching for census datasets. The process for downloading ACS data is the same as for downloading census data. It should be noted, however, that because it is a survey, there is a margin of error within the data. This margin of error can be significant at the census block group and tract levels. </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/2kT3W8U.jpeg" alt="Trim GEO_ID Field" style="width:100%;max-width:625px">
  <figcaption> Figure 12. Trimming the GEO_ID Field in the Census Dataset to Match the Census Boundary's "GEOID" Field   </figcaption>
  </figure> <br>

  <p> The choropleth map for the 2010 data should be set up in the same manner as for the 2020 data. Afterward, by closely examining the census tracts, differences in the boundaries between the 2010 and 2020 datasets will be observed (Figure 13).  </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/Ifv6zjY.jpeg" alt="US Census Chloropleth 2010 " style="width:100%;max-width:625px">
  <figcaption> Figure 13. A Choropleth Map Created with 2010 US Census Data   </figcaption>
  </figure> <br>

<p> The same process can be repeated to download census data from 2000 to 2010. Datasets older than 2000, however, are structured differently and are much more difficult to process. Fortunately, sources such as the <a href="https://data2.nhgis.org/main">National Historical GIS</a> provide these files. The search method on these platforms is similar to that of the U.S. Census website, where multiple filters are applied to navigate to the desired dataset. </p> <br>
   

  <h3> List of Figures </h3> <br>

  <p> Figure 1. The Hierarchy of Census Geographies  </p>
  <p> Figure 2. The US Census Data Website  </p>
  <p> Figure 3. The Advanced Search Pane on the US Census Data Website </p>
  <p> Figure 4. US Census Advanced Search Filters Input  </p>
  <p> Figure 5. US Census TIGER Line Website </p>
  <p> Figure 6. Using the Web Interface to Find 2023 Census Tract Boundaries </p>
  <p> Figure 7. Using the Census TIGER lines FTP </p>
  <p> Figure 8. The Raw Census Dataset </p>
  <p> Figure 9. The Processed Census Dataset </p>
  <p> Figure 10. Joining the Census Tract Dataset to the Census Tract Boundaries </p>
  <p> Figure 11. A Choropleth Map Created with 2020 US Census Data  </p>
  <p> Figure 12. Trimming the GEO_ID Field in the Census Dataset to Match the Census Boundary's "GEOID" Field </p> 
  <p> Figure 13. A Chloropleth Map Created with 2010 US Census Data  </p> <br>
  
  <h3> References </h3> <br>

  <div class="wysiwyg lengthy" ><p class="reference">U.S. Census Bureau. (n.d.). <em>Explore Census data</em>. <a href="https://data.census.gov/" target="_blank" rel="nofollow noopener noreferrer">https://data.census.gov/</a></p>

  <p class="reference">U.S. Census Bureau. (2024, January 9). <em>TIGER/Line shapefiles</em>. Census.gov. <a href="https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html" target="_blank" rel="nofollow noopener noreferrer">https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html</a></p>

  <p class="reference"><em>NHGIS Data Finder</em>. (n.d.). <a href="https://data2.nhgis.org/main">https://data2.nhgis.org/main</a></p>

  <p class="reference">US Census Bureau. (2021, October 8). <em>Understanding geographic relationships: counties, places, tracts and more</em>. Census.gov. <a href="https://www.census.gov/newsroom/blogs/random-samplings/2014/07/understanding-geographic-relationships-counties-places-tracts-and-more.html">https://www.census.gov/newsroom/blogs/random-samplings/2014/07/understanding-geographic-relationships-counties-places-tracts-and-more.html </a></p>



  

  <div id="myModal" class="modal">
   <span class="close">&times;</span>
   <img class="modal-content" id="img01">
   <div id="caption"></div>   
</div> <br>


<script>
// create references to the modal...
var modal = document.getElementById('myModal');
// to all images -- note I'm using a class!
var images = document.getElementsByClassName('myImages');
// the image in the modal
var modalImg = document.getElementById("img01");
// and the caption in the modal
var captionText = document.getElementById("caption");

// Go through all of the images with our custom class
for (var i = 0; i < images.length; i++) {
  var img = images[i];
  // and attach our click listener for this image.
  img.onclick = function(evt) {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}
</script>
 

  

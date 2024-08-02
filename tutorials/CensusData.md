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

  <p> In this tutorial, we will be downloading census files (boundaries and tables) for Boone County, Missouri. These files will contain information about the total population as well as racial and ethnic groups at the census tract level. Both files must be processed and joined together to map demographic data.  </p> <br>

  <p> US Census data can best be described as hierarchical. At the lowest level, or highest geographic scale, are census blocks, which are formed by human made and natural features such as streets, roads, railroads, streams, and visible physical and cultural features. Above census blocks are block groups, tracts, counties, states, divisions, regions, and finally the entire nation. Each of these census geographies at the top of the hierarchy can be disaggregated to census blocks. Figure 1 below depicts the standard hierarchy as well as alternative offshoots.  </p> <br>

  
  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/0ptopke.jpeg" alt="Census Geography Hierarchy" style="width:100%;max-width:625px">
  <figcaption> Figure 1. The Hierarchy of Census Geographies (US Census Bureau, 2021)  </figcaption>
  </figure> <br>

  <h3> Searching for Population Tables at the Census Tract Level </h3> <br>

  <p> The US Census data website can be found <a href="https://data.census.gov/">here</a>. Since this table will be implemented in GIS software, the search criteria need to be setup carefully -- the US Census has a massive number of similarly named datasets which can be quite confusing to navigate through. The "advanced search" option will be used to apply several filters to obtain to the specfic dataset. Select “advanced search” under the main search bar to begin (Figure 2). </p>  <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/BusE2V2.jpeg" alt="US Census Data" style="width:100%;max-width:625px">
  <figcaption> Figure 2. The US Census Data Website  </figcaption>
  </figure> <br>

  <p> On the left side of the webpage are multiple different subjects through which the search can be refined (Figure 3). </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/mT8nRO2.jpeg" alt="US Census Advanced Search" style="width:100%;max-width:625px">
  <figcaption> Figure 3. The Advanced Search Pane on the US Census Data Website  </figcaption>
  </figure> <br>

  <p> Now filters can be applied to the data. Starting with “Geographies”, click on “Census Tract”, choose “Missouri” from the popup list, then choose “Boone County”, and finally check on “All Census Tracts within Boone County, Missouri”. This limits the dataset to census tracts in Boone County, Missouri.  </p> <br>

  <p> Next, under “Topics”, select “Populations and People”. A list of ethnic and racial groups should pop up, ultimately check “Race and Ethnicity”. This will provide the option to map out specific racial or ethnic groups.  </p> <br>

  <p> Now, looking at “Surveys”, there are a several different options. To map the total population in 2020, information from an official census release is needed. Select “Decennial Census” and then select “Demographic and Housing Characteristics” (Demographic Profile and Redistricting Data PL 94 - 171 would also work for this tutorial, though the next steps assume "Demographic and Housing Characteristics was chosen).  </p> <br>

  <p> Under “Years”, select “2020” for 2020 US Census data. At this point, the results should look like Figure 4 below. </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/wwVNZch.jpeg" alt="US Census Advanced Search" style="width:100%;max-width:625px">
  <figcaption> Figure 4. US Census Advanced Search Filters Input  </figcaption>
  </figure> <br>

  <p> The top option, “P9”, works for the purpose of this tutorial (Figure 4). This dataset has information on whether the population is Hispanic or Latino, and not Hispanic or Latino, as well as a racial breakdown for both of those categories. For census data, it is important to note that being Hispanic or Latino is considered an ethnicity, whereas being Black or African American, Asian, American Indian or Alaska Native, Nativa Hawaiian or Pacific Islander, or White are considered racial groups.   </p> <br>

  <p> Collapse the search menu and look at the table. Note that the table needs to be downloaded in a specific way -- do not use the .zip, .csv, or .xlsx download options directly above the table. Instead, under the results menu, you can click the “P9” checkbox and then select “download” above it. Downloading the table in this way preserves the “GEOID” field, which is the unique identifier field used to join it to the census tract boundaries.    </p> <br>

  <p> With the census dataset file downloaded, it is time to download the census tract boundaries before processing the dataset file.  </p> <br>

  <h3> Finding GIS Boundary Files at the Census Tract Level with the US Census Web Interface </h3> <br>

  <p> With the census dataset obtained, head <a href="https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html"> here</a> to download the corresponding 2020 census tract TIGER (Topologically Integrated Geographic Encoding and Referencing system) Lines (Figure 5). </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/yyEckxw.jpeg" alt="US Census Tiger Lines" style="width:100%;max-width:625px">
  <figcaption> Figure 5. US Census TIGER Line Website  </figcaption>
  </figure> <br>

  <p> Choose 2023 as the year for the boundary file. The 2020-2022 vintages would also work without issues. The data can be downloaded via the the web interface or the ftp archive. The web interface is more user friendly, so choose it first. Here, there are dropdown boxes for the year and layer type. Make sure 2023 is selected for the year and census tracts are selected for the layer as shown in Figure 6 below.   </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/h6e0Fp5.jpeg" alt="US Census Tiger Line Web Interface" style="width:100%;max-width:625px">
  <figcaption> Figure 6. Using the Web Interface to Find 2023 Census Tract Boundaries  </figcaption>
  </figure> <br>


  <p> <em> Note why census tracts newer than 2019 must be chosen: the boundaries of census tracts, block groups, and blocks can and do change between decades. Tract boundaries may be shifted, split to create new tracts or merged to fuse tracts: this is done to reflect changes in population and urban development.   </em> </p> <br>

  <p> Hit submit to go to the census tract download page. Unfortunately, every census tract in Missouri must be downloaded. Extract the zip file at the download location and add the shapefile into ArcGIS Pro or other GIS software of choice. To have a visual overlay of Boone County's location in Missouri, download the Missouri counties file from the same web interface or quickly add it from the ArcGIS Living Atlas. </p> <br>

  <h3> Finding GIS Boundary FIles at the Census Tract Level with the US Census FTP </h3> <br>

  <p> The FTP (File Transfer Protocol) archive is another way of obtaining census boundary files. It can be faster to use than the web interface, though it is more technical in nature. Go back to the main webpage of the TIGER files site and select “ftp archive” (Figure 7).  </p> <br>
  
  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/53tUw8O.jpeg" alt="US Census Tiger Line FTP" style="width:100%;max-width:625px">
  <figcaption> Figure 7. Using the Census TIGER Lines FTP  </figcaption>
  </figure> <br>
  
  <p> Since census tracts are needed, a directory that reflects that name must be found. Scrolling down, there is the “TRACT/” folder, select that. This leads to a list of zip files, all of which are headed by “tl_2023_xx_tract.zip”. The number represented by the “xx” is the states' Federal Information Processing Standards (FIPS) code. The census bureau uses these codes to give each geographic entity a completely unique identifier – the FIPS codes become longer for smaller, higher scale geographic entities such as census blocks (which is why having a dataset file with the GEOID field was important). The FCC provides a FIPS code lookup guide <a href="https://transition.fcc.gov/oet/info/maps/census/fips/fips.txt"> here</a>. Looking at the FCC guide, the FIPS code for Missouri is 29, so that is the appropriate zip file to download. On the FTP site, click on "tl_2023_29_tract.zip" to download it.   </p> <br>


  <h3> Processing the US Census Tract Dataset to make it Compatible with GIS </h3> <br>

  <p> Open the census dataset spreadsheet that was downloaded earlier. It should look something like Figure 8 below. Notice that there are two headers, where the second acts as metadata for the first. Additionally, it has a GEOID field, which is necessary for joining it to the census tract boundaries. </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/uHZOpz7.jpeg" alt="US Census Data Raw" style="width:100%;max-width:625px">
  <figcaption> Figure 8. The Raw Census Dataset  </figcaption>
  </figure> <br>

<p> The second header needs to be deleted, though before doing so, be sure to rename the columns in the first header. In Figure 9 below, several of the columns in the main header were renamed.   </p> <br>



  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/EWqBHjR.jpeg" alt="US Census Data Processed" style="width:100%;max-width:625px">
  <figcaption> Figure 9. The Processed Census Dataset  </figcaption>
  </figure> <br>

  <p> Next, add the census dataset to ArcGIS Pro so that it is on the same map as the census tract boundaries. Export the census dataset to the geodatabase so that it can be edited. It is now time to join the census dataset to its tract boundaries. Use “GEOIDFQ” as the join field from the census tract boundaries and “GEO_ID” as the join field from the census tract dataset.  Figure 10 below shows the fields used for the join. </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/ABdp77Y.jpeg" alt="US Census Join" style="width:100%;max-width:625px">
  <figcaption> Figure 10. Joining the Census Tract Dataset to the Census Tract Boundaries  </figcaption>
  </figure> <br>

  <p> With the two datasets joined together, export the layer to the geodatabase to save it. At this point, the census data is ready to be mapped -- for the tutorial the total population will be quickly mapped. Figure 11 below shows a simple example of a choropleth map where the percentage of the total population within each census tract is mapped.   </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/3Kl75Zs.jpeg" alt="US Census Chloropleth" style="width:100%;max-width:625px">
  <figcaption> Figure 11. A Choropleth Map Created with 2020 US Census Data  </figcaption>
  </figure> <br>

  <h3> Using Older Census Datasets and the American Community Survey </h3> <br>

  <p> The 2020 census data has the benefit of being easier to use in GIS software. Older census datasets, however, require an additional processing step. To present this, download the same census data for Boone County, but for 2010 instead of 2020. The process for obtaining the census dataset is similar to the 2020 data, though instead of searching for "Demographic and Housing Characteristics" or "2020", select "DEC Summary File 1" and "2010". The summary files denotation is used with older data (2000 -- 2010). Obtaining the census boundary files is simple -- repeat the previous steps and select a year between 2011 and 2019.  </p> <br>

  <p> The 2010 census dataset is like the 2020 census dataset, so process it in the same manner as earlier. Add both it and the 2010 census tract boundary to ArcGIS Pro. When attempting to join the two datasets, however, notice that there is no “GEOIDFQ” field in the census tract boundaries like there was in the 2020 boundaries. </p> <br>

  <p> Comparing the attribute table of both layers, notice that the “GEO_ID” text field in the 2010 census dataset has the correct entries to join the two layers, though it is embedded in a larger string led with “1400000US”. To correct this, create a new field for the census dataset table called “GEOID10”. Use Calculate Field with Arcade, and in the field calculation, apply RIGHT(GEOID, 11). This will preserve the 11 characters on the right side of the field and render the field identical to the "GEOID" in the census tract boundaries (Figure 12).  </p> <br>

  <em> As a side note, this GEOID identifier is a FIPS code like the one used to specify the Missouri census tract dataset on the FTP site (notice the each of the census tracts start with "29" which refers to the state Missouri). For reference, census block groups have a unique 12 digit FIPS code and census blocks have a unique 15 digit FIPS code.  </em>

  <p> Along with the census there is also the American Community Survey, which, as the name implies, is a continuous survey given to random members of the population to record detailed demographic information. The heading for it appeared earlier ("Surveys") when searching for census datasets. The process for downloading ACS data is the same as downloading census information. Do note that since it is a survey, however, there is a margin of error within the data, though it is not significant until one goes below the county level. </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/2kT3W8U.jpeg" alt="Trim GEO_ID Field" style="width:100%;max-width:625px">
  <figcaption> Figure 12. Trimming the GEO_ID Field in the Census Dataset to Match the Census Boundary's "GEOID" Field   </figcaption>
  </figure> <br>

  <p> Setup the choropleth map for the 2010 data as you did for the 2020 data. If you look closely at the census tracts afterwards, you can see that they are different between 2010 and 2020 (Figure 13).  </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/Ifv6zjY.jpeg" alt="US Census Chloropleth 2010 " style="width:100%;max-width:625px">
  <figcaption> Figure 13. A Choropleth Map Created with 2010 US Census Data   </figcaption>
  </figure> <br>

  <p> You can repeat the same process to download census data from 2000-2010 as well. Datasets older than 2000, however, are structured differently and much more difficult to process. Thankfully, there are sources such as the <a href="https://data2.nhgis.org/main">National Historical GIS</a> which provide these files. The search method works much like the US census website, where multiple filters are used to navigate to the desired dataset.  </p>
   

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

  <p class="reference">US Census Bureau. (2021, October 8).<em>Understanding geographic relationships: counties, places, tracts and more</em>. Census.gov. <a href="https://www.census.gov/newsroom/blogs/random-samplings/2014/07/understanding-geographic-relationships-counties-places-tracts-and-more.html">https://www.census.gov/newsroom/blogs/random-samplings/2014/07/understanding-geographic-relationships-counties-places-tracts-and-more.html </a></p>



  

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
 

  

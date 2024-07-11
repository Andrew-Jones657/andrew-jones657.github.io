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
    
    <link rel="stylesheet" href="https://js.arcgis.com/4.29/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.29/"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>

</head>

<body>

<h1> Your Location History: Using Google Location History in ArcGIS Pro </h1> <br>

<p> It should come as no surprise that Google records location history. This is done to provide personalized services like maps, traffic updates, and location-based recommendations, using data from devices linked to a Google account. This data belongs to you, however, and with a little bit of work, it is possible to export and use this data. To start, lookup “Google Takeout” on your search browser. It should look something like Figure 1 below.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/GAG0zZv.jpeg" alt="Google Takeout Web Search" style="width:100%;max-width:625px">
<figcaption> Figure 1. Searching for Google Takeout on the Web </figcaption>
</figure> <br>

<p> Next, there will be a large list of different data you can check for export (Figure 2). For this tutorial, scroll down until you find “location history”. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/Sr48V31.jpeg" alt="Google Takeout Data Options" style="width:100%;max-width:625px">
<figcaption> Figure 2. Data Options from Google Takeout </figcaption>
</figure> <br>

<p> Ensure that you have location history checked. It is displayed below in Figure 3.   </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/1EcC8Up.jpg" alt="Google Takeout Location History" style="width:100%;max-width:625px">
<figcaption> Figure 3. Checking Off Location History in Google Takeout </figcaption>
</figure> <br>

<p> There are a couple of different options regarding how the data is exported. You can have a download link sent to your Gmail or add the takeout data to cloud storage. Additionally, you can partition the download for every two months (six files) or the entire year (one file). File types include .zip or .tgz, and file size includes a few options from 1-50 gigabytes. If you select a file size that is smaller than the size of your location history, you will receive multiple files so that they equal the size of your location history. Figure 4 below displays the options. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/SyGbtYS.jpeg" alt="Google Takeout Settings" style="width:100%;max-width:625px">
<figcaption> Figure 4. Export Options for Google Takeout  </figcaption>
</figure> <br>

<p> Go ahead and download the Google Takeout data from either your email link or cloud storage and unzip it. It is quite likely that it will be large – mine ended up being around 651 megabytes in size. The big caveat, however, is that the data is in a proprietary JSON format.  To use it in ArcGIS Pro, some adjustments will need to be made to standardize the data.  </p> <br>

<p> Considering the size of the Google Takeout data, attempting to manually edit it would be inefficient. At this point, it is best to consider a Python script to transform the data into standardized JSON or another format. Thankfully, there are several python scripts on Github for such a purpose. The most straightforward one to use is <a href="https://github.com/Andrew-Jones657/location-history-json-converter?tab=readme-ov-file"> location-history-json-convertor </a> by Gerwin Sturm (Figure 5). Download the location-history-json-convertor.py script. </p> <br> 

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/S0MFjBK.jpeg" alt="Location History Convertor" style="width:100%;max-width:625px">
<figcaption> Figure 5. Location History Convertor Python Script  </figcaption>
</figure> <br>

<p> To keep things organized, it is best to move the unzipped Google Takeout data and the Python script into the same folder (Figure 6).  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/Zj9LlKg.jpeg" alt="Folder for Data" style="width:100%;max-width:625px">
<figcaption> Figure 6. Storing the Google Takeout Data and Python Script in the Same Folder   </figcaption>
</figure> <br>

<p> Now consider the requisties to run the Python script. Python 3.2 or higher is needed, so ensure that it is installed and up to date. Additionally, there are a few Python libraries that will be needed. These are listed in the "requirements.txt" file on the Python script's webpage, though listed here, they are "Ijson", "Shapely", and "python-dateutil". These can be installed using PIP on Windows Command Prompt (Figure 7). Simply type "pip install ___" where the blank is replaced by each of the aforementioned packages (Ijson, Shapely, python-dateutil). Leave command prompt open since it will be used in the next step. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/4sLD272.jpeg" alt="Using PIP" style="width:100%;max-width:625px">
<figcaption> Figure 7. Using PIP to Install Required Python Packages   </figcaption>
</figure> <br>

<p> With the packages installed, the Python script can now be run. This will also be done on the command prompt. On command prompt, navigate to the folder where your Google Takeout data and Python script are located. This can be done by typing "cd (system path to your folder)" (Figure 8). </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/o7V8NWq.jpeg" alt="CMD cd" style="width:100%;max-width:625px">
<figcaption> Figure 8. Changing your Directory on Command Prompt   </figcaption>
</figure> <br>

<p>  </p> <br>

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

</body>

</html>

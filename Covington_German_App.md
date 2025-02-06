<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />
    <title>
      Covington's German Element, Social Institutions from 1861 to 1920
    </title>

<style>
      html,
      body,
      #viewDiv {
	    height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
	    min-height: 750px;
      min-width: auto;
      border: 1px solid #444444;
      }

      .inner {
      position: relative;
      max-width: 1000px;
      padding: 20px 10px;
      margin: 0 auto;
      }
  
      #infoDiv {
        padding: 10px;
        width: 320px;
      }

     #years-filter {
        height: 280px;
        width: 160px;
        visibility: hidden;
      }

      .year-item {
        width: 100%;
        padding: 12px;
        text-align: center;
        vertical-align: baseline;
        cursor: pointer;
        height: 40px;
      }

      .year-item:focus {
        background-color: dimgrey;
      }

      .year-item:hover {
        background-color: dimgrey;
      }

      #titleDiv {
        padding: 10px;
      }

      #titleText {
        font-size: 20pt;
        font-weight: 60;
        padding-bottom: 10px;
      }

      .esri-slider {
        height: 40px;
        background: none;
        width: 75%;
      }

      .leftPadding{
        padding-left: 5px;
      }

      .rightPadding{
        padding-right: 5px;
        font-weight: bold;
      }
      
</style>

<script type="module" src="https://js.arcgis.com/calcite-components/2.13.2/calcite.esm.js"></script>
<link rel="stylesheet" type="text/css" href="https://js.arcgis.com/calcite-components/2.13.2/calcite.css"/>

<link rel="stylesheet" href="https://js.arcgis.com/4.31/esri/themes/dark/main.css"/>
<script src="https://js.arcgis.com/4.31/"></script>

</head>

<body>

 <div id="years-filter" class="esri-widget">
      <div class="year-item visible-year" data-year="1861">
        1861
      </div>
      <div class="year-item visible-year" data-year="1871">
        1871
      </div>
      <div class="year-item visible-year" data-year="1880">
        1880
      </div>
      <div class="year-item visible-year" data-year="1890">
        1890
      </div>
      <div class="year-item visible-year" data-year="1900">
        1900
      </div>
      <div class="year-item visible-year" data-year="1910">
        1910
      </div>
      <div class="year-item visible-year" data-year="1920">
        1920
      </div>
    </div>
    <div id="viewDiv"></div>
    <div id="titleDiv" class="esri-widget">
      <div id="titleText">Covington's German Element</div>
      <div>German Social Institutions from 1861 to 1920</div>
    </div>
    <calcite-panel slot="contextual-panel" id="infoDiv" heading="1909 Covington KY Sanborn Fire Insurance Map">
      <br />
      <div id="elementsDiv"></div>
      <br />
      <calcite-label layout="inline-space-between"> Toggle layer blending<calcite-switch unchecked id="layerBlending"></calcite-switch> </calcite-label>
    </calcite-panel>
    
<script src="./files/Covington_German/Covington.js"></script> <br> 
    
<figure>
<figcaption> Covington's German Element Web Map </figcaption>
</figure> <br>

<ol>
<li> The research this web map is based on can be found <a href="https://digitalcommons.wku.edu/stu_hon_theses/866/"> here </a>. City Directories from Ancestry.com were used to locate and plot these social institutions, as well as research the backgrounds of the institutions’ owners to determine whether the owner was a German immigrant. </li>
<li> German identity is strictly defined in this study. For an institution to be considered German-owned, it had to be owned by first generation German immigrants.  </li>
<li> The addresses in the web map popups are historical, meaning that the street numbers do not translate accurately to modern addresses. Sanborn Fire Insurance maps, which display where the historical addresses were situated, were used to plot the latitude-longitude values of these addresses. The georeferenced image in the background of web map is one such map from 1909. </li>
<li> This web app initially displays ALL data from 1860 to 1920, use the ">>" arrows on the top left to narrow it down to a specific year. The legend can be expanded by clicking on the bottom right widget.   </li>
<li> Broadly speaking, German institutions dominate the cultural landscape by around 1880. Pay particular attention to the difference between 1910 and 1920, as several different factors, such as backlash from World War I, the Temperance Movement, and the Anti-Saloon League, force cultural assimilation on German immigrants and their descendants.  </li>
</ol>
  
</body>

</html>

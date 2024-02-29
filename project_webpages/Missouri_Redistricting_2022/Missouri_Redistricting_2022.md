<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    layout: page
    title: Missouri Congressional Redistricting 2022
   permalink: /Missouri_Redistricting_2022
</head> 

<body>
  
<h1> Congressional Redistricting in Missouri in 2022 </h1>

<p1> During the 2022 congressional redistricting cycle, I worked as the GIS Redistricting Analyst for the Missouri House of Representatives. In this nonpartisan position, I assisted in drafting representatives’ ideas for congressional districts.   </p1> <br>

<p2> There is a lot of misinformation about how congressional redistricting works, so I want to discuss it as well as some of the history behind the process in Missouri (at least since the 2002 cycle).  I will not delve into any personal details or use specific names in this article: this is merely a chronological look at congressional redistricting in Missouri from someone who has worked on it. I am also not going to provide any kind of critical evaluation on any map. Finally, I am not a legal professional, and this narrative does not serve as legal advice, consultation, or any form of legal interpretation.  </p2> <br>

<p3> Congressional redistricting occurs every ten years after both the US Census and apportionment are completed. Apportionment is the process by which each state’s population and population change is used to calculate its number of congressional seats. In Missouri, the congressional map is drawn by the state legislators and passed like a normal bill. Depending on the state, Congressional maps are passed by state legislatures, nonpartisan/bipartisan citizens commissions, or select commissions.  </p3> <br>

<p4> Congressional maps are drawn using boundary and population information from the US Census bureau. Topologically Integrated Geographic Encoding and Referencing (TIGER) line files such as counties, cities, voting precincts, and census blocks serve as boundary files, and the population and demographic information is included in PL 94-171. </p4> <br>

<p5> After the data is prepared, the process of map drawing may begin. Counties, cities, voting precincts, and census blocks are assigned district numbers to create new congressional districts. Typically, software such as Maptitude for Redistricting or ESRI Redistricting are used to create and manage redistricting plans. In the past two redistricting cycles, online redistricting programs have opened the process to the public, who can now more easily provide input on the process to map makers.   </p5> <br>

<p6> Many requirements and criteria apply when drawing a congressional district – attempting to work in even a few of the following factors becomes complex. This is not intended to be a deeply extensive list, but simply a glimpse at what all may be considered in drawing congressional districts.  </p6> <br>



<table>
  <tr>
      <td> Requirement </td>
      <td> Population </td>
      <td> 
          <ul> 
          <li> Congressional districts must be drawn down to the person, with population deviations as minimal as practicable. </li> 
          <li> Some states may have constitutional rules that allow for some flexibility on this (such as preventing splitting counties), but, in general, congressional districts are permitted far smaller   population deviations than other types of political districts. </li>
          </ul>  
      </td>
  </tr>
  <tr>
      <td> Requirement </td>
      <td> Contiguity </td>
      <td>  
          <ul>
          <li> Congressional districts must also be contiguous, meaning that districts are one geographic unit without separate portions surrounded by another district.  </li>
          <li> At the highest geographic scale, this means that all the census blocks within a district are connected by at least one edge (not vertex).  </li>
          </ul>
      </td>
  </tr>
  <tr>
     <td> Requirement</td>
     <td> Voting Rights Act</td>
     <td> Minority groups have the opportunity to elect their candidate of choice following the Gingles factors from Thornberry v Gingles (1986):
         <ol>
         <li> There is a sufficiently large and geographically compact racial minority or language group to form a majority in a single-member district. </li>
         <li> This minority group is politically cohesive (members vote similarly) </li>
         <li> The majority votes sufficiently as a bloc to enable it … usually to defeat the minority’s preferred candidate. </li>
         </ol>
     </td>    
  </tr>
  <tr> 
      <td> Requirement </td>
      <td> Compactness </td>
      <td> 
         <ul>
         <li> Congressional districts should be compact, meaning they are square shaped and do not have strange protrusions. </li>
         <li> This is a more difficult criteria to evaluate than population deviations or contiguity, as the line between a compact and non-compact district can be more ambiguous. </li>
         <li> Compactness is typically measured with mathematical tests such as Roeck, Schwartzberg, Polbsy-Popper, etc. </li>
         </ul>
      </td>
  </tr>
</table>

</body>

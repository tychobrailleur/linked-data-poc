$.ajaxSetup ({  
  cache: false  
});

$(document).ready(function() {
  $("#searchBtn").click(function() {
    $("#result").html("<img src='img/ajax-loader.gif' alt='Loading...'>");  
    var q = $("#q").val();
    $.getJSON(  
      "/match/" + q, 
      function(data) {
        renderReport(data);
       }
     );
    return false;
  });
});

function renderReport(data) {
  if (data.results && data.results.bindings.length > 0) {
    $.each(data.results.bindings, function(index, value) {
      if (value.p.value === "http://www.w3.org/2002/07/owl#sameAs") {
        if (value.prop.value.indexOf("dbpedia") !== -1) {
          getDbPedia(value.prop.value);
        }
      }
    });
    var content = "<h1>" + data.results.bindings[data.results.bindings.length-1].prop.value + "</h1>";
    $("#result").html(content); 
  }  
}

function getDbPedia(entityId) {
  console.log("DbPedia! " + entityId);
  $.getJSON(  
     "/dbpedia/" + encodeURIComponent(entityId), 
      function(data) {
        renderDbPedia(data, entityId);
       }
     );
}

function renderDbPedia(data, uri) {
  if (data.results && data.results.bindings.length > 0) {
    var element = $("#result");
    element.append("<p> " + data.results.bindings[0].abstract.value + " <span class=\"tiny\">Source: <a href=\"" + uri + "\">DbPedia</a></span></p>");
  }
}
 $.ajaxSetup ({  
        cache: false  
    });
var ajax_load = "<img src='img/ajax-loader.gif' alt='loading...' >";  
var loadUrl = "/match";
$(document).ready(function(){
  $("#searchBtn").click(function() {
    $("#result").html(ajax_load);  
    var q = $("#q").val();
    $.getJSON(  
      loadUrl + "/" + q, 
      function(data) {
        if (data.results && data.results.bindings.length > 0) {          
          $("#result").html("<h1>" + data.results.bindings[0].o.value + "</h1>");          }
       }
     );
    return false;
  });
});

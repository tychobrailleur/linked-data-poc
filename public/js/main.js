$.ajaxSetup ({
  cache: false
});

$(document).ready(function() {
  $("#searchBtn").click(function() {
    $("#result").hide();
    $("#spinner").show();
    var q = $("#q").val();
    $.getJSON(
      "/match/" + q,
      function(data) {
        alert(data);
        renderReport(data);
      }
    );
    return false;
  });
});

function renderReport(data) {
  var company;
  if (data) {
    // hardcoded, as the sparql query returns dbpedia for linked nodes too.
    getDbPedia(data["http://www.w3.org/2002/07/owl#sameAs"][1]);
    $("#report-duns").html(data["http://schema.org/Corporationduns"]);
    $("#report-address").html(data["http://schema.org/PostalAddressstreetAddress"]);
    
    $("#spinner").hide();
    $("#result").show();
    $("#report-name").html(data["http://schema.org/Corporationname"]);
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
    var element = $("#report-abstract");
    element.html("<p>" + data.results.bindings[0].abstract.value + " <span class=\"label label-info\">Source: <a href=\"" + uri + "\">DbPedia</a></span></p>");
    //var logo = $("#report-logo");
    //logo.attr("src", data.results.bindings[0].logo.value);
  }
}

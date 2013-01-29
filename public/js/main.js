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
        renderReport(data);
       }
     );
    return false;
  });
});

function renderReport(data) {
  var company;
  if (data.results && data.results.bindings.length > 0) {
    $.each(data.results.bindings, function(index, value) {
      if (value.p.value === "http://www.w3.org/2002/07/owl#sameAs") {
        if (value.prop.value.indexOf("dbpedia") !== -1) {
          getDbPedia(value.prop.value);
        }
      } else if (value.p.value === "http://schema.org/Corporationduns") {
        $("#report-duns").html(value.prop.value);
      } else if (value.p.value === "http://schema.org/Corporationaddress") {
        if (value.t && value.t.value === "http://schema.org/PostalAddressstreetAddress") {
          $("#report-address").html(value.sub.value);
        }
      } else if (value.p.value === "http://schema.org/Corporationname") {
        company = value.prop.value;
      }
    });

    $("#spinner").hide();
    $("#result").show();
    $("#report-name").html(company);
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
  }
}
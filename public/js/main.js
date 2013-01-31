$.ajaxSetup ({
  cache: false
});

var CompanyReportModel = {
  name: ko.observable(),
  duns: ko.observable(),
  address: ko.observable(),
  dbpedia: ko.observable(),
  description: ko.observable(),
  show: ko.observable(),
  getReport: function() {
    CompanyReportModel.show(false);
    var q = $("#q").val();
    $.getJSON(
      "/match/" + q,
      function(data) {
        renderReport(data);
      }
    );    
  }
};
ko.applyBindings(CompanyReportModel);

function renderReport(data) {
  if (data) {
    CompanyReportModel.name(data["http://schema.org/Corporationname"]);
    CompanyReportModel.duns(data["http://schema.org/Corporationduns"]);
    CompanyReportModel.address(data["http://schema.org/PostalAddressstreetAddress"]);

    // hardcoded, as the sparql query returns dbpedia for linked nodes too.
    CompanyReportModel.dbpedia(data["http://www.w3.org/2002/07/owl#sameAs"][1]);
    getDbPedia(data["http://www.w3.org/2002/07/owl#sameAs"][1]);

    CompanyReportModel.show(true);
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
    CompanyReportModel.description(data.results.bindings[0].abstract.value);
    //var logo = $("#report-logo");
    //logo.attr("src", data.results.bindings[0].logo.value);
  }
}

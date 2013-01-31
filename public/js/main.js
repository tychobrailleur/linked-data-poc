$.ajaxSetup ({
  cache: false
});

var CompanyReportModel = function() {
  self = this;

  // Search input text
  this.input = ko.observable();
  this.name = ko.observable();
  this.duns = ko.observable();
  this.address = ko.observable();
  this.dbpedia = ko.observable();
  this.description = ko.observable();

  // Variable to toggle results div display.
  this.show = ko.observable();

  this.getReport = function() {
    this.show(false);
    $.getJSON(
      "/match/" + this.input(),
      function(data) {
        self.renderReport(data);
      }
    );
  };

  this.renderReport = function(data) {
    if (data) {
      this.name(data["http://schema.org/Corporationname"]);
      this.duns(data["http://schema.org/Corporationduns"]);
      this.address(data["http://schema.org/PostalAddressstreetAddress"]);
      
      // hardcoded, as the sparql query returns dbpedia for linked nodes too.
      this.dbpedia(data["http://www.w3.org/2002/07/owl#sameAs"][1]);
      this.getDbPedia(data["http://www.w3.org/2002/07/owl#sameAs"][1]);
      
      this.show(true);
    }
  };

  this.getDbPedia = function(entityId) {
    console.log("DbPedia! " + entityId);
    $.getJSON(
      "/dbpedia/" + encodeURIComponent(entityId),
      function(data) {
        self.renderDbPedia(data, entityId);
      }
    );
  };

  this.renderDbPedia = function(data, uri) {
    if (data.results && data.results.bindings.length > 0) {
      this.description(data.results.bindings[0].abstract.value);
      //var logo = $("#report-logo");
      //logo.attr("src", data.results.bindings[0].logo.value);
    }
  };
};

ko.applyBindings(new CompanyReportModel());

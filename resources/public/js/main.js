$.ajaxSetup ({
  cache: false
});

var CompanyReportModel = function() {
  self = this;

  // Search input text
  this.input = ko.observable();
  this.name = ko.observable();
  this.duns = ko.observable();
  this.logo = ko.observable();
  this.streetAddress = ko.observable();
  this.addressLocality = ko.observable();
  this.addressRegion = ko.observable();
  this.postalCode = ko.observable();
  this.foundingDate = ko.observable();
  this.address = ko.computed(function() {
   return self.streetAddress() + ", " + self.addressLocality() + ", "
      + self.addressRegion() + " " + self.postalCode();
  });

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
      if (typeof data["http://schema.org/Corporationaddress"] !== "undefined") {
        this.streetAddress(data["http://schema.org/Corporationaddress"]["http://schema.org/PostalAddressstreetAddress"]);
        this.addressLocality(data["http://schema.org/Corporationaddress"]["http://schema.org/PostalAddressaddressLocality"]);
        this.addressRegion(data["http://schema.org/Corporationaddress"]["http://schema.org/PostalAddressaddressRegion"]);
        this.postalCode(data["http://schema.org/Corporationaddress"]["http://schema.org/PostalAddresspostalCode"]);
      }
      this.foundingDate(data["http://schema.org/CorporationfoundingDate"]);

      // hardcoded, as the sparql query returns dbpedia for linked nodes too.
      this.dbpedia(data["http://www.w3.org/2002/07/owl#sameAs"][0]);
      this.getDbPedia(data["http://www.w3.org/2002/07/owl#sameAs"][0]);

      this.show(true);
    }
  };

  this.getDbPedia = function(entityId) {
    console.log("DbPedia! " + entityId);
    $.getJSON(
      "/dbpedia/" + encodeURIComponent(entityId),
      function(data) {
        console.log(data);
        self.renderDbPedia(data, entityId);
      }
    );
  };

  this.renderDbPedia = function(data, uri) {
    if (data && data.length > 0) {
      this.description(data[0].abstract.value);
      this.logo(data[0].logo.value);
    }
  };
};

ko.applyBindings(new CompanyReportModel());

/**
 * @file: views.js
 */

var AppView = Backbone.View.extend({
  el: $('body'),
  
  events: {
    "click #search_field": "emptyAddRouteField",
    "click #submit_button": "startTraceroute",
    "click #monitoring_button" : "openMonitoring"
 },

  initialize: function () {
    this.traceroutes = [];
    this.googlemapView = new GoogleMapView;
    
    $("#monitorWindow").hide();
    $("#packet_container").hide()
    _.bindAll(this, "startTraceroute");
    _.bindAll(this, "removeTraceroute");
    _.bindAll(this, "handleRouteClick");
  },

  emptyAddRouteField: function () {
    $("#search_field").val("");
  },

  openMonitoring: function() {

   var pcapView = new PcapView;
   console.log("this");   
  
  },

  startTraceroute: function () {
    var self = this;

    var id = $("#search_field").val();

   // Need to add, if ID exists in this.tracerouts RETURN

    var r = new Traceroute({
      id: id,
      color: randomColor()
    });

    r.el.on("click", ".remove-route", function () {
      self.removeTraceroute(r);
    });

    r.el.on("click", ".hide-route", function () {
      if (!r.hidden)
        r.hideRoute(self.googlemapView.map);
      else
        r.unhideRoute(self.googlemapView.map);
    });

    r.fetch({
      success: function () {
        r.drawRoute(self.googlemapView.map);
        r.el.on("click", r.el, function (e) {
          self.handleRouteClick(r, e);
        });
      },
      error: function () {
        r.drawFailedRoute();
      }
    });
    this.traceroutes.push(r);
  },

  removeTraceroute: function (r) {
    r.removeRoute();

    var index = this.traceroutes.indexOf(r);
    if (index > -1)
      this.traceroutes.splice(index, index+1)
  },

  handleRouteClick: function (r, e) {
    if ($(e.target).hasClass("remove-route"))
      return;

    if ($(e.target).hasClass("hide-route"))
      return;

    if (!r.focused) {
      r.focusRoute(this.googlemapView.map);
      r.el.find("a").first().addClass("focus");
    }
    else if (r.focused) {
      r.unfocusRoute(this.googlemapView.map);
      r.el.find("a").first().removeClass("focus");
    }
  }

});

var PcapView = Backbone.View.extend({
 el: $('#monitorWindow'),
 
  //Events associated with monitoring
  events: {
   "click #startCapture" : "startMonitoring",
   "click #removePackets": "removePackets"
   },

  //Render monitorWindow
  initialize: function() {
    this.render();
    _.bindAll(this, "renderPacketList");
  },

  render: function() {
   this.$el.show();
  },
 
  /* On start capturing click, validate user input from filter
     and packet input boxes, and make ajax request to capture
     and return a list of outgoing IP addresses to render in
     a list.
  */
  startMonitoring: function(filter, numPackets, test) {     
 
   //Error cases, for testing and user validation.
   if(test === undefined) {
    filter  =  $("#filterBox").val();
    numPackets =  $("#packetBox").val();
   }
   if(numPackets == "") {
    alert("Please enter a packet number as an integer.");
    return 1;
   }
   if(numPackets % 1 !== 0){
     alert("Invalid packet number. Please enter an integer <= 1000.");
     return 1;
   }
   if(numPackets % 1 === 0 && (($.type(filter) !== "string"))) {
    alert("Invalid filter and packet number.");
    return 1;      
   }
   if(numPackets > 1000 || numPackets <= 0) {
    alert("Packet range must be in-between 0 and 1000.");
    return 1;
   }
   //If test, don't do ajax call. User input is validated.
   if(test == 1) {
    return 0;
   }

   var newObject = this;
   
   //Empty filters are allowed. "null" is an easy check on backend.
   if(filter == "") {
    filter = "null";
   }
 
   //Hide so user knows it is capturing again (if doing 2nd capture).
   $("#pcap_ip_container").hide();
   
   //Make ajax request to get string of outgoing ips.
   $.ajax("pcap_script/" + filter + "/" + numPackets + "/" + "0").
                         done(function (obj) {
                         var pkts = obj.capture_list[0].split(",");
                         //If no packets back, most likely a filtering syntax issue (or sudo).
                         if(pkts == "") {
                           alert("Error in paket capture. Check filter syntax and/or restart application with sudo permissions"); 
                           return 0;
                         }
                         else { 
                            newObject.renderPacketList(pkts);
                            return 1;
                         }
                         });
 },

  //Removes packets from list on "clear" click.
  //First element of ip list is passed in.
  removePackets: function(elements) {
  
  /* If the user is clicking the clear button grab the ips.
     Else, the user clicked the start capture button, and
     A new render will clear current list
     before generating a new list.
  */

  if(!elements.size) {
    elements  = $("#pcap_ip_container div");
   }
  
   var totalRemoved = 0;
 
   //remove all ips from div.
   if(elements.length > 0) {
    elements.each(function() {
    this.remove();
    totalRemoved++;
   });

   $("#pcap_ip_container").hide(); 
   return totalRemoved;
  }
  return 0;
 }, 

  //Takes in the parsed list of ips.
  renderPacketList: function(ips) {
   var elements = $("#pcap_ip_container div");
   var numIpsRendered = 0;  
 
   //If there is already a list, clear it.
   if(elements.length > 0) {
     this.removePackets(elements);
   }

   if(ips.length > 1000) {
     alert("Error. To many ips.");
     return numIpsRendered;
   }

   $("#pcap_ip_container").show();

  //For each ip in the list, append to the ip container
  try {
    for(var i = 0; i < ips.length; i++) {
      if(ips[i] % 1 === 0) {
        return numIpsRendered;
      }
      var stuff = $(".ip-list-template").clone(true, true).attr("id",i)
      .removeClass("ip-list-template").addClass("ipEl").appendTo("#pcap_ip_container");
      stuff.id = i;
      stuff.find(".par").append(ips[i]);
      numIpsRendered++;      
  }
 }
  catch(err) {
   console.log("error!");
   alert("Error!");
   return -1;
 }
 return numIpsRendered;
},

  handlePacketClick: function(id) {
   var ip = $("#pcap_ip_container").find("#" + id).first().last().text()
   $("#search_field").val(ip.trim());
  }

});

var GoogleMapView = Backbone.View.extend({
  el: $('#map_canvas'),
  initialize: function () {
    this.featureOpts = [
      {
        "featureType": "water",
        "stylers": [
          { "hue": "#a7c5bd" },
          { "lightness": -50},
          { "saturation": -60}
        ]
      },
      {
        "featureType": "landscape.natural.landcover",
        "stylers": [
          { "hue": "#eb7b59" },
          { "saturation": 0 },
          { "lightness": 0 }
        ]
      },
      {
        "featureType": "administrative.locality",
        "stylers": [
          { "visibility": "on" }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          { "visibility": "off" }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      },
      {
        "featureType": "road.highway",
        "stylers": [
          { "visibility": "off" }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          { "visibility": "off" }
        ]
      },
      {
        "featureType": "landscape.natural",
        "stylers": [
          { "hue": "#eb7b59"},
          { "visibility": "simplified" },
          { "saturation": 70 },
          { "lightness": 10 }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          { "visibility": "off" }
        ]
      }
    ];

    this.mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(40.6,-95.665),
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, "custom_style"]
      },
      mapTypeId: "custom_style",
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.$el.get(0), this.mapOptions);
    this.customMapType = new google.maps.StyledMapType(this.featureOpts, { name: "custom_style" });
    this.map.mapTypes.set("custom_style", this.customMapType);
  }
});

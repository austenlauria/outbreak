/**
 * @file: main.js
 */


(function ($) {

  var app = new AppView;
  console.log("HOLY SHIT meetballs");
})(jQuery);

$(document).ready(function() {

 $("#packet_container").on('click', '.ipEl', function() {
  var id = this.id;
  var pcap = new PcapView();
  pcap.handlePacketClick(id);
 });
})


var getitemList = function(){$(document).ready(function() {

 $("#packet_container").on('click', '.ipEl', function() {
  var id = this.id;
  var pcap = new PcapView();
  pcap.handlePacketClick(id);
 });
})}


var randomColor = function() {
  var rand = Math.floor(Math.random() * 16777215);
  var hex = rand.toString(16);
  var color = '#' + hex;
  return color;
}

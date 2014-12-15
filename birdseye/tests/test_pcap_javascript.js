QUnit.test('PCap Render List Tests', function() {
    expect(6); //Tests expected.

 var view = new PcapView();
 var ips = [];
 var result;
 var ip = "42.42.42.42"
 
 //1. List size 10
 ips = renderListHelper(ip, 10);
 result = view.renderPacketList(ips);
 equal(10, result);

 //2. 0 sized list
 ips = renderListHelper(ip, 0);
 result = view.renderPacketList(ips);
 equal(0, result);

 //3. 1000 sized list
 ips = renderListHelper(ip, 1000);
 result = view.renderPacketList(ips);
 equal(1000, result);

 //4. 1001 sized list
 ips = renderListHelper(ip, 1001);
 result = view.renderPacketList(ips);
 equal(0, result);

 //5. Single element list
 ips = renderListHelper(ip, 1);
 result = view.renderPacketList(ips);
 equal(1, result);

 //6. Non-string test
 ips = renderListHelper(1, 3);
 result = view.renderPacketList(ips);
 equal(0, result);

});


function renderListHelper(ip,times) {
 
 var ips = []; 

 for(var i = 0; i < times; i++) {
  ips[i] = ip;
 }
 return ips;
}

QUnit.test('PCap Monitoring Test', function() {
      expect(15); //Num tests expected
 
 var view = new PcapView();
 view.render();

 //1. Valid filter, valid packet number
 var result = view.startMonitoring("tcp", 1, 1);
 equal(0, result);

 //2. Invalid filter, invalid packet number
 result = view.startMonitoring(1, "a", 1);
 equal(1, result);

 //3. Invalid filter, valid packet number
 result = view.startMonitoring(1, 1, 1);
 equal(1, result); 
 
 //4. valid filter, invalid packet number
 result = view.startMonitoring("tcp", "x", 1);
 equal(1, result);

 //5. Both empty 
 result = view.startMonitoring("", "", 1);
 equal(1, result);

 //6. Empty filter
 result = view.startMonitoring("", 50, 1);
 equal(0, result);

 //7. Valid filter, empty packet number
 result = view.startMonitoring("tcp", "", 1);
 equal(1, result);

 //8. Valid filter, to many packets
 result = view.startMonitoring("tcp", 1001, 1);
 equal(1, result);

 //9. Valid filter, max packets
 result = view.startMonitoring("tcp", 1000, 1);
 equal(0, result);

 //10. Valid filter, negative packets
 result = view.startMonitoring("tcp", -1000, 1);
 equal(1, result);

 //11. Valid filter, 0 Packets
 result = view.startMonitoring("tcp", 0, 1); 
 equal(1, result);

 //12. Bad filter, to many packets
 result = view.startMonitoring(1, 20000, 1);
 equal(1, result);
 
 //13. empty fiter, to many packets
 result = view.startMonitoring("", 20000, 1);
 equal(1, result);

 //14. Valid filter, to many packets
 result = view.startMonitoring("tcp", 20000, 1);
 equal(1, result);

 //15. Invalid filter, negative packets
 result = view.startMonitoring(236, -50, 1);
 equal(1, result);

});

QUnit.asyncTest('pcap Test', function() {
      expect(11); //Num tests expected
 
 var view = new PcapView();
 view.render();

 //1. Valid filter, valid packet number
 var result = view.startMonitoring("tcp", 1, 1);
 equal(1, result);

 //2. Invalid filter, invalid packet number
 result = view.startMonitoring(1, "a", 1);
 equal(0, result);

 //3. Invalid filter, valid packet number
 result = view.startMonitoring(1, 1, 1);
 equal(0, result); 
 
 //4. valid filter, invalid packet number
 result = view.startMonitoring("tcp", "x", 1);
 equal(0, result);

 //5. Both empty 
 result = view.startMonitoring("", "", 1);
 equal(0, result);

 //6. Empty filter
 result = view.startMonitoring("", 1, 1);
 equal(0, result);

 //7. empty packet number
 result = view.startMonitoring("tcp", "", 1);
 equal(0, result);

 //8. To many packets
 result = view.startMonitoring("tcp", 1001, 1);
 equal(0, result);

 //9. Max packets
 result = view.startMonitoring("tcp", 1000, 1);
 equal(1, result);

 //10. Back filter, to many packets
 result = view.startMonitoring(1, 20000, 1);
 equal(0, result);
 
 //11. empty fiter, to many packets
 result = view.startMonitoring("", 20000, 1);
 equal(0, result);

});

QUnit.test('assert.async() test', function() {
 equal(1,1,'One is one');
});

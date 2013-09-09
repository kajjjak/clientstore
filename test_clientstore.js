
describe("ClientStoreInterfaceIndexedDB, ", function() {
	beforeEach(function() {
		window.clientStoreInterfaceIndexedDB = new ClientStoreInterfaceIndexedDB();
		window.clientStoreInterfaceIndexedDB.init(50, "test_clientStoreInterfaceIndexedDB", ["test_table"], function(){
			setTimeout(function(){
				window.clientstore_clientStoreInterfaceIndexedDB_ready = true;	
			}, 500);
			
		}, function(){
			alert("Could not create indexddb");
		});
  });

  afterEach(function() {
  	ClientStoreUtilsRemoveIndexedDB("test_clientStoreInterfaceIndexedDB");
  });	
  
  it("Set/Get item", function() {
  	waitsFor(function() { return window.clientstore_clientStoreInterfaceIndexedDB_ready; });
    runs(function(){
    	window.clientStoreInterfaceIndexedDB.setItem("test_table", "item_a", "A");
    	window.result = undefined;
    	window.clientStoreInterfaceIndexedDB.getItem("test_table", "item_a", function(res){
				window.result = res;    		
    	});
    });
    waitsFor(function() { return window.clientstore_clientStoreInterfaceIndexedDB_ready && window.result });
    runs(function(){
    	expect(window.result).toEqual("A");
    });
    
  });
});

describe("ClientStore, ", function() {
	beforeEach(function() {
		ClientStore.init(50, "test_clientstore", ["test_clientstore_table"], function(){
			setTimeout(function(){
				window.clientstore_indexeddb_ready = true;	
			}, 500);
			
		}, function(){
			alert("Could not create indexddb");
		}, ClientStore.USE_INDEXEDDB);
  });

  afterEach(function() {
  	ClientStoreUtilsRemoveIndexedDB("test_clientstore");
  });	
  
  it("Set/Get item", function() {
  	waitsFor(function() { return window.clientstore_indexeddb_ready; });
    runs(function(){
    	ClientStore.setItem("test_clientstore_table", "my_item_a", "Aa");
    	window.result = undefined;
    	ClientStore.getItem("test_clientstore_table", "my_item_a", function(res){
				window.result = res;    		
    	});
    });
    waitsFor(function() { return window.clientstore_indexeddb_ready && window.result });
    runs(function(){
    	expect(window.result).toEqual("Aa");
    });
    
  });
});
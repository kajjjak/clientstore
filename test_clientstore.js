CLIENT_STORE_DATABASE_NAME = "test_db";

describe("ClientStoreInterfaceIndexedDB, ", function() {
	beforeEach(function() {
		window.clientStoreInterfaceIndexedDB = new ClientStoreInterfaceIndexedDB();
		window.clientStoreInterfaceIndexedDB.init(50, CLIENT_STORE_DATABASE_NAME, ["test_table"], function(){
			window.clientstore_indexeddb_ready = true;
		}, function(){
			alert("Could not create indexddb");
		}, ClientStore.USE_INDEXEDDB);
  });

  afterEach(function() {
  	ClientStoreUtilsRemoveIndexedDB(CLIENT_STORE_DATABASE_NAME);
  });	
  
  it("Set/Get item", function() {
  	waitsFor(function() { return window.clientstore_indexeddb_ready; });
    runs(function(){
    	window.clientStoreInterfaceIndexedDB.setItem("test_table", "item_a", "A");
    	window.result = undefined;
    	window.clientStoreInterfaceIndexedDB.getItem("test_table", "item_a", function(res){
				window.result = res;    		
    	});
    });
    waitsFor(function() { return window.clientstore_indexeddb_ready && window.result });
    runs(function(){
    	expect(window.result).toEqual("A");
    });
    
  });
});
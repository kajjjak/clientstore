
describe("Client store, ", function() {
	beforeEach(function() {
		ClientStore.init(50, "test_db", ["test_table"], function(){
			window.clientstore_indexeddb_ready = true;
		}, null, ClientStore.USE_INDEXEDDB);
  });

  afterEach(function() {
  	//ClientStoreUtilsRemoveIndexedDB(CLIENT_STORE_DATABASE_NAME);
  });	
  
  it("Set/Get item", function() {
  	waitsFor(function() { return window.clientstore_indexeddb_ready });
    runs(function(){
    	ClientStore.setItem("test_table", "item_a", "A");
    	window.result = undefined;
    	ClientStore.getItem("test_table", "item_a", function(res){
				window.result = res;    		
    	});
    });
    waitsFor(function() { return window.clientstore_indexeddb_ready && window.result });
    runs(function(){
    	expect(window.result).toEqual("A");
    });
    
  });
});
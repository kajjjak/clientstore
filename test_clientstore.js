
function createDB(){
	ClientStoreUtilsRemoveIndexedDB("test_clientstore");
	window.clientstore_indexeddb_ready = false;	
	setTimeout(function(){
		ClientStore.init(5, "test_clientstore", ["test_clientstore_table", "test_table"], function(){
			setTimeout(function(){
				window.clientstore_indexeddb_ready = true;	
				window.clientStoreInterfaceIndexedDB = ClientStore.db;
			}, 500);
			
		}, function(){
			alert("Could not create indexddb");
		}, ClientStore.USE_INDEXEDDB);

	}, 500);	
}
createDB();
/*
function ClientStoreInterfaceIndexedDBase(){
	ClientStoreUtilsRemoveIndexedDB("test_clientstore");
	setTimeout(function(){
		window.clientStoreInterfaceIndexedDB = new ClientStoreInterfaceIndexedDB();
		window.clientStoreInterfaceIndexedDB.init(5, "test_clientstore", ["test_table"], function(){
			setTimeout(function(){
				window.clientstore_indexeddb_ready = true;	
			}, 1500);
			
		}, function(){
			alert("Could not create indexddb");
		});	
		
	}, 1500);
}
*/
describe("ClientStoreInterfaceIndexedDB", function() {
	//ClientStoreInterfaceIndexedDBase();
	beforeEach(function() {
  });

  afterEach(function() {
  });	
  
  it("Set/Get item", function() {
  	waitsFor(function() { return window.clientstore_indexeddb_ready && window.clientStoreInterfaceIndexedDB; });
    runs(function(){
    	window.clientStoreInterfaceIndexedDB.setItem("test_table", "item_a", "A");
    	window.client_result = undefined;
    	window.clientStoreInterfaceIndexedDB.getItem("test_table", "item_a", function(res){
				window.client_result = res;    		
    	});
    });
    waitsFor(function() { return window.clientstore_indexeddb_ready && window.client_result });
    runs(function(){
    	expect(window.client_result).toEqual("A");
    });    
  });
  
  it("Set and get all items", function() {
  	waitsFor(function() { return window.clientstore_indexeddb_ready; });
    runs(function(){
    	window.clientStoreInterfaceIndexedDB.setItem("test_table", "item_a", "A");
    	window.clientStoreInterfaceIndexedDB.setItem("test_table", "item_b", "B");
    	window.client_allitems_result = undefined;
    	window.clientStoreInterfaceIndexedDB.getAll("test_table", function(items){
				window.client_allitems_result = items;    		
    	});
    });
    waitsFor(function() { return window.clientstore_indexeddb_ready && window.client_allitems_result });
    runs(function(){
    	expect(window.client_allitems_result).toEqual([ { key : 'item_a', value : 'A' }, { key : 'item_b', value : 'B' } ]);
    });    
  });
  
});

describe("ClientStore", function() {
	beforeEach(function() {
  });

  afterEach(function() {
  });
  
  it("Set/Get item", function() {
  	waitsFor(function() { return window.clientstore_indexeddb_ready; });
    runs(function(){
    	ClientStore.setItem("test_clientstore_table", "my_item_aa", "Aa");
    	window.client_result = undefined;
    	ClientStore.getItem("test_clientstore_table", "my_item_aa", function(res){
				window.client_result = res;    		
    	});
    });
    waitsFor(function() { return window.clientstore_indexeddb_ready && window.client_result });
    runs(function(){
    	expect(window.client_result).toEqual("Aa");
    });
  });
  
  it("Clear item", function() {

  	waitsFor(function() { return window.clientstore_indexeddb_ready; });
    runs(function(){
    	window.client_result = undefined;
    	ClientStore.removeItem("test_clientstore_table", "my_item_a");
    	setTimeout(function(){
	    	ClientStore.getItem("test_clientstore_table", "my_item_a", 
	    	function(res){
					window.client_result = "found it";
	    	},function(){
	    		window.client_result = "did not found it";
	    	});  		
    	}, 1000);
    });
    waitsFor(function() { return window.clientstore_indexeddb_ready && window.client_result });
    runs(function(){
    	expect(window.client_result).toEqual("did not found it");
    });
  });
});
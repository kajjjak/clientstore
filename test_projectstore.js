function createProjectDB(){
	ProjectStore.nuke();
	window.projectstore_indexeddb_ready = false;	
	setTimeout(function(){

		ProjectStore.init(50, function(){
			setTimeout(function(){
				window.projectstore_indexeddb_ready = true;	
			}, 500);
			
		}, function(){
			alert("Could not create indexddb");
		});

	}, 500);	
}

describe("ProjectStore, ", function() {
	beforeEach(function() {
  });

  afterEach(function() {
  });	
  
  it("Set/Get item", function() {
  	createProjectDB();
  	waitsFor(function() { return window.projectstore_indexeddb_ready; });
    runs(function(){
    	ClientStore.setItem("cw_projects", "my_item_a", "Aa");
    	window.project_result = undefined;
    	ClientStore.getItem("cw_projects", "my_item_a", function(res){
				window.project_result = res;    		
    	});
    });
    waitsFor(function() { return window.projectstore_indexeddb_ready && window.project_result });
    runs(function(){
    	expect(window.project_result).toEqual("Aa");
    });
  });

});
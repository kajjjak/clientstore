function createProjectDB(){
	ProjectStore.nuke();
	window.projectstore_indexeddb_ready = false;	
	setTimeout(function(){

		ProjectStore.init(50, function(){
			console.info("Created db");
			setTimeout(function(){
				window.projectstore_indexeddb_ready = true;	
			}, 500);
			
		}, function(){
			alert("Could not create indexddb");
		});

	}, 500);	
}

describe("ProjectStore", function() {
	beforeEach(function() {
  });

  afterEach(function() {
  });	
  
  it("Save/Open local project", function() {
  	createProjectDB();
  	waitsFor(function() { return window.projectstore_indexeddb_ready; });
    runs(function(){
    	console.info("Runs Save/Open local project");
    	ProjectStore.saveProject({uid:"myid", data:"mydata"});
    	window.project_result = undefined;
    	ProjectStore._loadProjectLocal("myid", function(res){
				window.project_result = res;    		
    	});
    });
    waitsFor(function() { return window.projectstore_indexeddb_ready && window.project_result });
    runs(function(){
    	expect(window.project_result).toEqual({uid:"myid", data:"mydata"});
    });
  });
  
  it("Save/Open local file", function() {
  	window.file_result = undefined;
  	waitsFor(function() { return window.projectstore_indexeddb_ready; });
    runs(function(){
    	ProjectStore.saveFile({uid:"myfileid", data:"mydata"});
    	window.file_result = undefined;
    	ProjectStore.openFile("myfileid", function(res){
				window.file_result = res;    		
    	});
    });
    waitsFor(function() { return window.projectstore_indexeddb_ready && window.file_result });
    runs(function(){
    	expect(window.file_result).toEqual({uid:"myfileid", data:"mydata"});
    });
  });

});
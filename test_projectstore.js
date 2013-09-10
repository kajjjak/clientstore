window.projectstore_databasename = "codewip_testdb2";

window.projectstore_test_data1_uid = "myid";
window.projectstore_test_data1 = {uid: window.projectstore_test_data1_uid, config : { uid : 'config' }, files : [ ], meta : { uid : 'meta' }, target : { uid : 'target' }};
window.projectstore_test_data2_uid = "myfileid";
window.projectstore_test_data2 = {uid: window.projectstore_test_data2_uid, config : { uid : 'config' }, files : [ ], meta : { uid : 'meta' }, target : { uid : 'target' }};

function createProjectDB(){
	console.info("Nuking DB " + window.projectstore_databasename);
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
	createProjectDB();
	
	beforeEach(function() {
  });

  afterEach(function() {
  });	
  
  it("Save/Open local project", function() {
  	waitsFor(function() { return window.projectstore_indexeddb_ready; });
    runs(function(){
    	console.info("Runs Save/Open local project");
    	ProjectStore.saveProject(window.projectstore_test_data1);
    	window.project_result = undefined;
    	ProjectStore._loadProjectLocal(window.projectstore_test_data1_uid, function(res){
				window.project_result = res;    		
    	});
    });
    waitsFor(function() { return window.projectstore_indexeddb_ready && window.project_result });
    runs(function(){
    	expect(window.project_result).toEqual(window.projectstore_test_data1);
    });
  });
  
  it("Save/Open local file", function() {
  	window.file_result = undefined;
  	waitsFor(function() { return window.projectstore_indexeddb_ready; });
    runs(function(){
    	ProjectStore.saveFile(window.projectstore_test_data2);
    	window.file_result = undefined;
    	ProjectStore.openFile(window.projectstore_test_data2_uid, function(res){
				window.file_result = res;    		
    	});
    });
    waitsFor(function() { return window.projectstore_indexeddb_ready && window.file_result });
    runs(function(){
    	expect(window.file_result).toEqual(window.projectstore_test_data2);
    });
  });
});
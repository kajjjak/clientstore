/* 
Uses clientstore.js for local storage of projects and interfaces with Codewip web service api 
*/
var ProjectStore = new function() {
    this.init = function(size_in_mb, callback_success, callback_failure){
    	ClientStore.init(size_in_mb, "codewip", ["projects", "openfiles", "history"], callback_success, callback_failure);
    };
    
    this.saveFile = function(obj){
    	/*
    		Should save all open files
    	*/
    	
    };
    
    this.cacheFile = function(obj){
    	/*
    		Should save the file with state close
    	*/
    };
    
    this.closeFile = function(obj){
    	/*
    		Should save the file with state close
    	*/
    };
    
    this.openFile = function(file_id, callback_success){
    	
    };
    
    this.saveProject = function(obj){
    	if (!obj.uid){ throw "ProjectStore.saveProject expected a .uid in object"; }
    	ClientStore.setItem("projects", obj.uid, JSON.stringify(obj));
    };
    
    this.closeProject = function(obj){
    	/* Will save the project */
    	this.saveProj(obj);
    };
    
    this.openProject = function(project_id, callback_success, callback_failure){
    	/*
    		call this._loadProjLocal with callback_failure call that will try to load from server
    	*/
    	this._loadProjectLocal(project_id,
    	callback_success, 
    	function(){
    		alert("Not found letss ask server");
    	});    	
    };
    
    this._loadProjectLocal = function(project_id, callback_success, callback_failure){
    	/*
    		Will check if server_project_data is the same project we are trying to open and load that if it is newer
    	*/
    	ClientStore.getItem("projects", project_id,
	    	function(r){
	    		callback_success(JSON.parse(r));
	    	}, 
	    	function(){
	    		callback_failure("Not found");
	    	}
	    );    	    	
    };
    
    this._loadProjectOnline = function(project_id, callback_success, callback_failure){
    	/*
    		Loads the project online and save locally and then calls _loadProjLocal on success (note that this can be a everlasing loop)
    	*/
    };  
    
    this.nuke = function(){
    	ClientStoreUtilsRemoveIndexedDB("codewip");
    };
    
};
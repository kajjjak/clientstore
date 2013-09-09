/* 
Uses clientstore.js for local storage of projects and interfaces with Codewip web service api 
*/
var ProjectStore = new function() {
    this.init = function(size_in_mb, callback_success, callback_failure){
    	ClientStore.init(size_in_mb, "codewip", ["cw_projects", "cw_openfiles", "cw_history"], callback_success, callback_failure);
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
    
    this.saveProj = function(obj){
    	//creates a history and saves file
    };
    
    this.closeProj = function(obj){
    	/* Will save the project */
    	this.saveProj(obj);
    };
    
    this.openProj = function(project_id, callback_success, callback_failure){
    	/*
    		call this._loadProjLocal with callback_failure call that will try to load from server
    	*/
    };
    
    this._loadProjLocal = function(project_id, callback_success, callback_failure){
    	/*
    		Will check if server_project_data is the same project we are trying to open and load that if it is newer
    	*/
    };
    
    this._loadProjOnline = function(project_id, callback_success, callback_failure){
    	/*
    		Loads the project online and save locally and then calls _loadProjLocal on success (note that this can be a everlasing loop)
    	*/
    };  
    
    this.nuke = function(){
    	ClientStoreUtilsRemoveIndexedDB("codewip");
    };
    
};
/* 
Uses clientstore.js for local storage of projects and interfaces with Codewip web service api 
Project format is like this:
{
	files:{ SourceFile },
	uid: xxxx,
	meta: {},
	targets: {},
	config: {}
}
*/
var ProjectStore = new function() {
    this.init = function(size_in_mb, callback_success, callback_failure){
    	this.db_name = window.projectstore_databasename || "codewip";
    	ClientStore.init(size_in_mb, this.db_name, ["projects", "openfiles", "history"], callback_success, callback_failure);
    };
    
    this.setTarget = function(attr, value){
    	/*
    		Will queue for save target data (only online)
    	*/
    	
    };
    
    this.getTarget = function(attr){
    	
    };
    
    this.setMeta = function(attr, value){
    	/*
    		Will queue for save meta data (only online)
    	*/
    };
    
    this.getMeta = function(attr, default_value){
    	
    };
    
    this.saveFile = function(obj, state){
    	/*
    		Should save all open files and queue to save it online as well
    	*/
    	if (!state){ state = "saved"; }
    	if (!obj.uid){ throw "ProjectStore.saveFile expected a .uid in object"; }
    	ClientStore.setItem("openfiles", obj.uid, JSON.stringify(obj));    	
    };
    
    this.cacheFile = function(obj){
    	/*
    		Should save the file with state close
    	*/
    	this.saveFile(obj, "cache");
    };
    
    this.closeFile = function(obj){
    	/*
    		Should save the file with state close
    	*/
    	this.saveFile(obj, "closed");
    };
    
    this.openFile = function(file_id, callback_success, callback_failure){
    	ClientStore.getItem("openfiles", file_id,
	    	function(r){
	    		callback_success(JSON.parse(r));
	    	}, 
	    	function(){
	    		callback_failure("Not found");
	    	}
	    );    	    	    	
    };
    
    this.saveProject = function(obj){
    	if (!obj.uid){ throw "ProjectStore.saveProject expected a .uid in object"; }
    	ClientStore.setItem("projects", obj.uid, JSON.stringify(obj));
    	//save online
    };
    
    this.closeProject = function(obj){
    	/* Will save the project */
    	this.saveProj(obj);
    };
    
    this._unpackProject = function(obj){
    	/* Takes a project and stores the project data files into files cache*/
    	if((!obj.files) || (!obj.meta) || (!obj.uid) || (!obj.target)){ throw "Missing property while unpacking"; }
    	var f;
    	for (var i in obj.files){
    		this.cacheFile(obj.files[i]);
    	}
    	this.cacheFile(obj.meta);
    	this.cacheFile(obj.target);
    	this.cacheFile(obj.config);
    };

    this.openProject = function(project_id, callback_success, callback_failure){
    	/*
    		call this._loadProjLocal with callback_failure call that will try to load from server
    	*/
    	this._loadProjectLocal(project_id,
    	callback_success, 
    	function(){
    		self._loadProjectOnline(project_id, callback_success, callback_failure);
    	});    	
    };
    
    this._loadProjectLocal = function(project_id, callback_success, callback_failure){
    	/*
    		Will check if server_project_data is the same project we are trying to open and load that if it is newer
    	*/
    	var self = this;
    	ClientStore.getItem("projects", project_id,
	    	function(r){
	    		var p = JSON.parse(r);
	    		self._unpackProject(p);
	    		callback_success(p);
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
			var ops = options;
			//options.showUserMessage({"message": "Trying to store current version online", "level": 0});
			fetchJSON({
			  type: 'GET',
			  url: '/api/projects',
			  contentType: 'application/json; charset=utf-8',
			  dataType: 'text',
			  success: function(data){
			    var p = JSON.parse(data);
			    self._unpackProject(p);
			    if (p.error){
			      ops.showUserMessage({"message": "Project stored failed: " + p.error, "level": -2});
			    } else{
			      ops.showUserMessage({"message": "Project " + method.toLowerCase() + " successfully online", "level": 1});
			      if(ops.onSavedOnlineSuccess){ops.onSavedOnlineSuccess();}
			    }
			  },
			  error: function(e){
			    ops.showUserMessage({"message": "Project stored failed. Could not post data due to error '" + e.statusText + "' (" + e.status + ") calling " + ops.url, "level": -2});
			  }
			});
    	
    };  
    
    this.nuke = function(){
    	ClientStoreUtilsRemoveIndexedDB(this.db_name);
    };
    
};
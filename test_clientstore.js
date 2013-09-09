CLIENT_STORE_DATABASE_NAME = "test_clientstore";

describe("Client store, ", function() {
	beforeEach(function() {
		ClientStore.init(50, "test_db", null, null, ClientStore.USE_INDEXEDDB);
  });

  afterEach(function() {
  	//ClientStoreUtilsRemoveIndexedDB(CLIENT_STORE_DATABASE_NAME);
  });	
  
  it("contains spec with an expectation", function() {
    expect(true).toBe(false);
  });
});
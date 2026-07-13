export class IndexedDBWrapper {
    constructor(dbName, version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.indexedDB = window.indexedDB;
        this.objectStore;
        this.req;
        this.db;
        this.objectStoreName;
    }
    openDB(objectStoreName) {
        return new Promise((resolve, reject) => {
            this.objectStoreName = objectStoreName;
            this.req = window.indexedDB.open(this.dbName, this.version);
            this.req.onupgradeneeded = (e) => {
                this.db = this.req.result;
                this.objectStore = this.db.createObjectStore(objectStoreName, {
                    keyPath: "id",
                });
            };
            console.log("opendb");
            this.req.onsuccess = (e) => {
                this.db = e.target.result;
                console.log("ONSUCCESS");
                resolve();
            };
        });
    }
    addRecord(record) {
        return new Promise((resolve, reject) => {
            console.log("add record");
            const transaction = this.db.transaction(
                this.objectStoreName,
                "readwrite"
            );
            this.objectStore = transaction.objectStore(this.objectStoreName);
            this.objectStore.add(record);
            resolve();
        });
    }
    getRecord(id) {
        return new Promise((resolve, reject) => {
            let newRes;
            this.db = this.req.result;
            const transaction = this.db.transaction(
                this.objectStoreName,
                "readwrite"
            );
            this.objectStore = transaction.objectStore(this.objectStoreName);
            const res = this.objectStore.get(id);
            res.onsuccess = (e) => {
                resolve(e.target.result);
            };
        });
    }
    getAllRecords() {
        return new Promise((resolve, reject) => {
            console.log("get All record", this.req);
            console.log("Before success");
            this.db = this.req.result;

            const transaction = this.db.transaction(
                this.objectStoreName,
                "readwrite"
            );
            this.objectStore = transaction.objectStore(this.objectStoreName);
            const res = this.objectStore.getAll();
            res.onsuccess = (e) => {
                console.log("is success");
                resolve(res.result);
            };
        });
    }
    deleteRecord(id) {
        return new Promise((resolve, reject) => {
            this.db = this.req.result;

            const transaction = this.db.transaction(
                this.objectStoreName,
                "readwrite"
            );
            this.objectStore = transaction.objectStore(this.objectStoreName);
            const res = this.objectStore.delete(id);
            res.onsuccess = (e) => {
                alert("Successfully delted record with id ", id);
            };
        });
    }
    updateRecord(record) {
        return new Promise((resolve, reject) => {
            console.log("add record");
            const transaction = this.db.transaction(
                this.objectStoreName,
                "readwrite"
            );
            this.objectStore = transaction.objectStore(this.objectStoreName);
            this.objectStore.put(record);
            resolve();
        });
    }
}

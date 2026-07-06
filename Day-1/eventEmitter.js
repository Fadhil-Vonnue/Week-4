class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter((el) => el !== listener);
    }
    emit(event, ...args) {
        if (!this.events[event]) return;
        for (let ev of this.events[event]) {
            ev(...args);
        }
        if (this.events["*"])
            for (let ev of this.events["*"]) {
                ev(...args);
            }
    }
    once(event, listener) {
        const listen = function (...args) {
            this.off(event, listener);
            listener(...args);
        };
        this.on(event, listen);
    }
}
class UserStore extends EventEmitter {
    constructor() {
        super();
        this.users = {};
    }
    userAdded(id, name) {
        if (!this.users[name]) {
            this.users[id] = name;
            this.emit("userAdded", id);
        }
        return;
    }
    userRemoved(id) {
        delete this.users[id];
        this.emit("userRemoved", id);
    }
    userUpdated(id, update) {
        if (!this.users[update]) {
            this.users[id] = update;
            this.emit("userUpdated", id);
        }
        return;
    }
}
const emitter = new EventEmitter();
const logData = (data) => console.log(`Data: ${data}`);
emitter.on("*", logData);
emitter.on("data", logData);
emitter.emit("data", "Test1");
emitter.off("data", logData);
emitter.emit("data", "Test2");

const userStore = new UserStore();
userStore.on("userAdded", (id) => {
    console.log(`USER with ID ${id} ADDED `);
});
userStore.on("userRemoved", (id) => {
    console.log(`USER with ID ${id} REMOVED `);
});
userStore.on("userUpdated", (id) => {
    console.log(`USER with ID ${id} UPDATED `);
});

userStore.userAdded(10, "Fadhil");
userStore.userAdded(11, "Faro");
userStore.userRemoved(11);
userStore.userUpdated(10, "HEATHER");

function createUser({ name, email, role = `viewer`, createdAt = Date.now() }) {
    if (!name || !email) {
        throw new Error("Invalid details");
    }
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!regex.test(email)) throw new Error("Invalid email format");
    let id = crypto.randomUUID();
    let user = {
        id,
        name,
        email,
        role,
        createdAt,
    };
    Object.freeze(user);
    return user;
}
try {
    let user = createUser({ email: "mfadhil@gmail.com" });
    console.log(user);
    let user1 = createUser({ email: "mfadhilgmail.com" });
    console.log(user1);
    let user2 = createUser({ name: "FADHIL", email: "mfadhilgmail.com" });
    console.log(user2);
} catch (err) {
    console.log(err.message);
}

class QueryBuilder {
    constructor() {
        this.query = {
            select: ["*"],
            from: "",
            where: [],
            limit: null,
        };
    }
    select(fields) {
        if (!Array.isArray(fields)) {
            this.query.select = [fields];
        } else this.query.select = fields;
        return this;
    }
    from(table) {
        this.query.table = table;
        return this;
    }
    where(condition) {
        this.query.where.push(condition);
        return this;
    }
    limit(n) {
        this.query.limit = n;
        return this;
    }
    build() {
        let SQLquery = `SELECT ${this.query.select.join(",")} FROM ${this.query.table}`;
        if (this.where.length != 0) {
            SQLquery += ` WHERE ${this.query.where.join(" AND ")}`;
        }
        if (this.query.limit !== null) {
            SQLquery += ` LIMIT ${this.query.limit}`;
        }
        return SQLquery;
    }
}

const query = new QueryBuilder();
console.log(
    query
        .from("table1")
        .where(`salary > 10000`)
        .select(`employees`)
        .limit(3)
        .build()
);
function createNotification({
    type,
    message,
    duration = 7,
    dismissible = false,
}) {
    return {
        type,
        message,
        duration,
        dismissible,
        show() {
            console.log(type, message, duration, dismissible);
        },
    };
}
const ob = createNotification({ type: "error", message: "HAWAS KHILADI" });
ob.show();

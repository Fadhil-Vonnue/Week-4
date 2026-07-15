const rules = {
    name: [{ rule: "required" }, { rule: "minLength", minLength: 3 }],
    username: [
        { rule: "required" },
        {
            rule: "custom",
            fn: (value) => value.toLowerCase() !== "admin",
        },
    ],
    email: [{ rule: "required" }, { rule: "email" }],
    phone: [{ rule: "pattern", regex: /[0-9]{10}/ }],
    msg: [{ rule: "required" }, { rule: "minLength", minLength: 20 }],
    password: [
        { rule: "required" },
        { rule: "minLength", minLength: 8 },
        { rule: "maxLength", maxLength: 12 },
    ],
};
class FormValidator {
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
    }
    validateAll() {
        Object.keys(this.rules).forEach((key, index) => {
            this.validate(this.form.elements[key]);
        });
    }
    validate(field) {
        let flag = 0;
        if (this.rules[field.name]) {
            for (const rule of this.rules[field.name]) {
                switch (rule.rule) {
                    case "required":
                        if (field.value.trim() == "") {
                            field.nextElementSibling.textContent = `${field.name} is required`;
                            flag = 1;
                            break;
                        } else break;
                    case "minLength":
                        if (
                            rule.minLength > field.value.length &&
                            field.value
                        ) {
                            console.log(
                                `${field.name} has a minlength of ${rule.minLength}`
                            );
                            field.nextElementSibling.textContent = `${field.name} has a minlength of ${rule.minLength}`;
                            flag = 1;
                            break;
                        } else break;

                    case "maxLength":
                        if (rule.maxLength < field.value.length) {
                            console.log(
                                `${field.name} has a maxlength of ${rule.maxLength}`
                            );
                            field.nextElementSibling.textContent = `${field.name} has a maxlength of ${rule.maxLength}`;
                            flag = 1;
                            break;
                        } else break;
                    case "pattern":
                        if (rule.regex.test(field.value)) {
                            break;
                        } else {
                            console.log(
                                `${field.name} doesnt follow the pattern`
                            );
                            field.nextElementSibling.textContent = `${field.name} doesnt follow the pattern`;
                            flag = 1;
                            break;
                        }
                    case "email":
                        if (
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                                field.value
                            )
                        ) {
                            break;
                        } else {
                            console.log(
                                `${field.name} doesnt follow the pattern example@mail.com`
                            );
                            field.nextElementSibling.textContent = `${field.name} doesnt follow the pattern example@mail.com`;
                            flag = 1;
                            break;
                        }
                    case "match":
                        if (
                            document.querySelector(
                                `[name="${rule.otherField}"]`
                            ).value == field.value
                        ) {
                            break;
                        } else {
                            console.log(
                                `${field.name} is not same as ${rule.otherField}`
                            );
                            field.nextElementSibling.textContent = `${field.name} is not same as ${rule.otherField}`;
                            flag = 1;
                            break;
                        }
                    case "custom":
                        if (rule.fn(field.value)) {
                            console.log("not an admin");
                            field.nextElementSibling.textContent =
                                field.nextElementSibling.textContent +
                                "not an admin";
                            flag = 1;
                        } else break;
                }
            }
            if (flag) {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
            } else {
                field.classList.add("is-valid");
                field.classList.remove("is-invalid");
                field.nextElementSibling.textContent = "";
            }
        }
    }
}

module.exports = { FormValidator, rules };

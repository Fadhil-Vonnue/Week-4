export const rules = {
    name: [{ rule: "required" }, { rule: "minLength", minLength: 2 }],
    email: [{ rule: "required" }, { rule: "email" }],
    role: [{ rule: "required" }],
    phone: [{ rule: "pattern", regex: /[0-9]{10}/ }],
    msg: [{ rule: "required" }, { rule: "minLength", minLength: 20 }],
};
export class FormValidator {
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
        this.init();
    }
    init() {
        this.form.addEventListener(
            "blur",
            (e) => {
                if (
                    e.target.tagName === "INPUT" ||
                    e.target.tagName === "TEXTAREA" ||
                    e.target.tagName === "SELECT"
                ) {
                    this.validate(e.target);
                }
            },
            true
        );
    }
    validateAll() {
        let flag = 0;
        Object.keys(this.rules).forEach((key) => {
            flag += this.validate(this.form[key]);
        });
        return flag;
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
                            field.nextElementSibling.textContent = `${field.name} has a minlength of ${rule.minLength}`;
                            flag = 1;
                            break;
                        } else break;

                    case "maxLength":
                        if (rule.maxLength < field.value.length) {
                            field.nextElementSibling.textContent = `${field.name} has a maxlength of ${rule.maxLength}`;
                            flag = 1;
                            break;
                        } else break;
                    case "pattern":
                        if (rule.regex.test(field.value)) {
                            break;
                        } else {
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
                            field.nextElementSibling.textContent = `${field.name} is not same as ${rule.otherField}`;
                            flag = 1;
                            break;
                        }
                    case "custom":
                        if (rule.fn(field.value)) {
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
        return flag;
    }
}

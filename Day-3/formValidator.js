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
};
class FormValidator {
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
        // this.init();
    }
    // init() {
    //     // this.form.addEventListener("submit",(e)=>{
    //     //     this.validateAll()
    //     // })
    //     this.form.addEventListener(
    //         "blur",
    //         (e) => {
    //             if (e.target.tagName === "INPUT") {
    //                 console.log(
    //                     "Input left:",
    //                     event.target.name,
    //                     event.target.value
    //                 );
    //                 this.validate(e.target);
    //             }
    //         },
    //         true
    //     );
    // }
    validateAll() {
        Object.keys(this.rules).forEach((key, index) => {
            console.log(this.form.elements[key]);
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
                            //   alert(`${field.name} is required`);
                            console.log(field.name, "is required");
                            field.nextElementSibling.textContent = `${field.name} is required`;
                            flag = 1;
                            break;
                        } else break;
                    case "minLength":
                        if (
                            rule.minLength > field.value.length &&
                            field.value
                        ) {
                            //   alert(`${field.name} has a minlength of ${rule.minLength}`);
                            field.nextElementSibling.textContent = `${field.name} has a minlength of ${rule.minLength}`;
                            flag = 1;
                            break;
                        } else break;

                    case "maxLength":
                        if (rule.maxLength < field.value.length) {
                            //   alert(`${field.name} has a maxlength of ${rule.maxLength}`);
                            field.nextElementSibling.textContent = `${field.name} has a maxlength of ${rule.maxLength}`;
                            flag = 1;
                            break;
                        } else break;
                    case "pattern":
                        if (rule.regex.test(field.value)) {
                            break;
                        } else {
                            //   alert(`${field.name} doesnt follow the pattern`);
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
                            //   alert(`${field.name} doesnt follow the pattern example@mail.com`);
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
                            //   alert(`${field.name} is not same as ${rule.otherField}`);
                            field.nextElementSibling.textContent = `${field.name} is not same as ${rule.otherField}`;
                            flag = 1;
                            break;
                        }
                    case "custom":
                        if (rule.fn(field.value)) {
                            //   alert("not an admin");
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
// const form = document.querySelector("form");
// const newform = new FormValidator(form, rules);
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     newform.validateAll();
// });
module.exports = { FormValidator, rules };

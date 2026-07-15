const { FormValidator, rules } = require("./formValidator.js");
const userEvent = require("@testing-library/user-event").default;
const user = userEvent.setup();
const accordion = require("./accordion.js");
require("@testing-library/jest-dom");
const { openHam: nav, trapFocus } = require("./nav.js");
describe("FORM VALIDATOR", () => {
    document.body.innerHTML = `<form action=""><label for="nameId">Enter Name *</label>
          <input type="text" name="name" id="nameId"/><span style="color:red;" class="field-error"></span><br /><br />
          <label for="usernameId">Enter Username *</label>
          <input type="text" name="username" id="usernameId" /><span style="color:red;" class="field-error"></span><br /><br />
          <label for="emailId">Enter Email *</label>
          <input type="email" id="emailId" name="email"/><span style="color:red;" class="field-error"></span><br /><br />    </form>`;
    const form = document.querySelector("form");
    test("FORM", () => {
        const newform = new FormValidator(form, rules);
        console.log(newform);
        newform.validateAll();
    });
});
describe("test accordion", () => {
    document.body.innerHTML = `
            <main>
                <div class="header"></div>
                <div class="panel"></div>
            </main>`;
    const header = document.querySelector(".header");
    const panel = document.querySelector(".panel");
    accordion(header, panel);
    header.click();
    console.log(document.body.innerHTML);
    test("aria-expanded to true", () => {
        expect(panel.ariaExpanded).toBe("true");
    });
    test("panel become visible (max-height not zero)", () => {
        expect(panel.style.maxHeight).not.toBe("0px");
    });
});

describe("test nav", () => {
    document.body.innerHTML = `
            <main>
            <button class="hamburger"></button>
            <div class="drawer">
                <a href="" id="1"></a>
                <a href="" id="2"></a>
                <a href="" id="3"></a>
            </div>
            <button class="toggle"></button>
        </main>`;
    const hamburger = document.querySelector(".hamburger");
    const drawer = document.querySelector(".drawer");
    const links = document.querySelectorAll("a");

    nav(hamburger, drawer);
    hamburger.click();
    trapFocus(drawer);
    test("drawer has class open", () => {
        expect(drawer.classList).toContain("isToggled");
    });

    test("focus is trapped", async () => {
        links[0].focus();
        await user.tab();
        await user.tab();
        await user.tab();
        expect(links[0]).toHaveFocus();
    });
});

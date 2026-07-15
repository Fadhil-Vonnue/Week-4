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
          <input type="email" id="emailId" value="hi@co" name="email"/><span style="color:red;" class="field-error"></span><br /><br /> 
           <input
                        type="tel"
                        placeholder=" "
                        name="phone"
                        id="tel-id"
                    />
                    <label for="tel-id">Enter Phone No *</label>
                    <textarea id="msg" placeholder=" " name="msg"></textarea
                    >
                    <label for="msg">Tell us:</label>
                    <input type="password" id="passId" name="password"/><span style="color:red;" class="field-error"></span><br /><br />
            <label for="passId">Enter Password *</label>
          </form>`;
    const form = document.querySelector("form");
    const nameId = document.querySelector("#nameId");
    const passs = document.querySelector("#passId");
    const messages = document.querySelector("#msg");
    const tele = document.querySelector("#tel-id");
    const mails = document.querySelector("#emailId");
    const username = document.querySelector("#usernameId");
    nameId.value = "f";
    test("FORM INVALID", () => {
        passs.value = "jfjfdhskjdsfkjshdfkjsjfks";
        const newform = new FormValidator(form, rules);
        newform.validateAll();
    });
    test("FORM VALID", () => {
        nameId.value = "jameslacro";
        passs.value = "hsdhah123";
        messages.value = `jdsvjhkjhdvsjlhkjsdvkjkjvhAKjhaskhvdkjhkjsvdhkjhasjkvjkvsdksfafas`;
        tele.value = 123456789;
        mails.value = "example@gmail.com";
        username.value = "admin";
        const newform = new FormValidator(form, rules);
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
    test("aria-expanded to true", () => {
        expect(panel.ariaExpanded).toBe("true");
    });
    test("panel become visible (max-height not zero)", () => {
        expect(panel.style.maxHeight).not.toBe("0px");
    });

    test("aria-expanded to false", () => {
        header.click();
        expect(panel.ariaExpanded).toBe("false");
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
    test("focus is trapped reverse", async () => {
        links[0].focus();
        await user.tab({ shift: true });
        await user.tab({ shift: true });
        await user.tab({ shift: true });
        expect(links[0]).toHaveFocus();
    });
});

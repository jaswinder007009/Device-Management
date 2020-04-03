// export function openForm() {
// 	document.getElementsByClassName("RegisterForm")[0].classList.add("active");
// }
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // export function closeForm() {
    // 	document.getElementsByClassName("RegisterForm")[0].classList.remove("active");
    // }
    // export function disableEditing() {
    // 	(<HTMLInputElement>document.getElementById("password")).disabled = true;
    // 	(<HTMLInputElement>document.getElementById("userName")).disabled = true;
    // 	(<HTMLInputElement>document.getElementById("confirmpass")).disabled = true;
    // }
    function openForm() {
        // document.getElementsByClassName("RegisterForm")[0].classList.add("active");
        document.querySelector("#myForm").style.display = "block";
    }
    exports.openForm = openForm;
    function closeForm() {
        // document.getElementsByClassName("RegisterForm")[0].classList.remove("active");
        document.querySelector("#myForm").style.display = "none";
    }
    exports.closeForm = closeForm;
    function disableEditing() {
        document.getElementById("password").disabled = true;
        document.getElementById("userName").disabled = true;
        document.getElementById("confirmpass").disabled = true;
    }
    exports.disableEditing = disableEditing;
});

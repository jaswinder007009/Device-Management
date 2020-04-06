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
    function openForm() {
        Array.from(document.getElementsByClassName('form-hideable')).forEach(function (element) {
            element.classList.remove('hide');
            element.classList.add('show');
        });
        Array.from(document.getElementsByClassName('data-hideable')).forEach(function (element) {
            element.classList.add('hide');
            element.classList.remove('show');
        });
        Array.from(document.getElementsByClassName('data-hideable1')).forEach(function (element) {
            element.classList.add('hide');
            element.classList.remove('show');
        });
        Array.from(document.getElementsByClassName('data-hideable2')).forEach(function (element) {
            element.classList.add('hide');
            element.classList.remove('show');
        });
    }
    exports.openForm = openForm;
    function closeForm() {
        Array.from(document.getElementsByClassName('form-hideable')).forEach(function (element) {
            element.classList.remove('show');
            element.classList.add('hide');
        });
        Array.from(document.getElementsByClassName('data-hideable')).forEach(function (element) {
            element.classList.add('show');
            element.classList.remove('hide');
        });
        Array.from(document.getElementsByClassName('data-hideable1')).forEach(function (element) {
            element.classList.add('show');
            element.classList.remove('hide');
        });
        Array.from(document.getElementsByClassName('data-hideable2')).forEach(function (element) {
            element.classList.add('show');
            element.classList.remove('hide');
        });
    }
    exports.closeForm = closeForm;
});

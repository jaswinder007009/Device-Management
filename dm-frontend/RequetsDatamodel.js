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
    var RequestModel = /** @class */ (function () {
        function RequestModel() {
            this.userName = "";
            this.email = "";
            this.deviceId = 0;
            this.serialNumber = "";
            this.deviceType = "";
            this.deviceName = "";
            this.requestStatus = "";
            this.specifications = "";
            this.requestDate = undefined;
            this.AssignedAdmminName = "";
            this.assignDate = undefined;
            this.assignDays = 0;
            this.returnDate = undefined;
            this.adminName = "";
        }
        return RequestModel;
    }());
    exports.RequestModel = RequestModel;
});

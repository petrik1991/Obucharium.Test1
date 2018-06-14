"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MathOps = /** @class */ (function () {
    function MathOps() {
    }
    MathOps.SimpleOperation = function (expression) {
        var evaluated = "";
        var result = expression;
        var regResult = this.simpleOperation.exec(result);
        var operands = regResult[0].match(/\d+/g);
        var operator = regResult[0].match(/[\+-]/)[0];
        switch (operator) {
            case "+":
                evaluated = (parseInt(operands[0]) + parseInt(operands[1])).toString();
                break;
            case "-":
                evaluated = (parseInt(operands[0]) - parseInt(operands[1])).toString();
                break;
        }
        return result.replace(regResult[0], evaluated);
    };
    MathOps.PriorityOperation = function (expression) {
        var evaluated = "";
        var result = expression;
        var regResult = this.multOperation.exec(result);
        var operands = regResult[0].match(/\d+/g);
        var operator = regResult[0].match(/[*\/]/)[0];
        switch (operator) {
            case "*":
                evaluated = (parseInt(operands[0]) * parseInt(operands[1])).toString();
                break;
            case "/":
                evaluated = (parseInt(operands[0]) / parseInt(operands[1])).toString();
                break;
        }
        return result.replace(regResult[0], evaluated);
    };
    MathOps.simpleOperation = /\d+[\+-]\d+/;
    MathOps.multOperation = /\d+[*\/]\d+/;
    return MathOps;
}());
exports.MathOps = MathOps;
//# sourceMappingURL=mathOps.js.map
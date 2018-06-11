"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mathOps_1 = require("./mathOps");
var Parser = /** @class */ (function () {
    function Parser() {
        this.multOperatorsPattern = /[*\/]/g;
        this.simpleOperatorsPattern = /[\+-]/g;
        this.bracketsPattern = /\(([\d\+*-\\]*)\)/;
    }
    Parser.prototype.ParseExpression = function (expression) {
        var result = expression;
        if (result.search(this.bracketsPattern) > -1) {
            result = this.ParseBrackets(result);
        }
        if (result.search(this.simpleOperatorsPattern) > -1 || result.search(this.multOperatorsPattern) > -1) {
            result = this.Evaluate(result);
        }
        return parseInt(result);
    };
    Parser.prototype.ParseBrackets = function (expression) {
        var result = expression;
        var match = result.match(this.bracketsPattern)[1];
        var bracket = result.match(this.bracketsPattern)[0];
        var innerResult = this.Evaluate(match);
        result = result.replace(bracket, innerResult);
        if (result.search(this.bracketsPattern) > -1) {
            result = this.ParseBrackets(result);
        }
        return result;
    };
    Parser.prototype.Evaluate = function (expression) {
        var result = expression;
        if (result.search(this.multOperatorsPattern) > -1) {
            result = mathOps_1.MathOps.PriorityOperation(result);
            if (result.search(this.multOperatorsPattern) > -1) {
                result = mathOps_1.MathOps.PriorityOperation(result);
            }
        }
        if (result.search(this.simpleOperatorsPattern) > -1) {
            result = mathOps_1.MathOps.SimpleOperation(result);
            if (result.indexOf("-") != 0 && result.search(this.simpleOperatorsPattern) > -1) {
                result = mathOps_1.MathOps.SimpleOperation(result);
            }
        }
        return result.replace(/[\s]+/g, "");
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map
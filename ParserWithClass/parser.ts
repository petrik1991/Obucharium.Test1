import {MathOps} from "./mathOps";

export class Parser {
    readonly multOperatorsPattern: RegExp = /[*\/]/g;
    readonly simpleOperatorsPattern: RegExp = /[\+-]/g;
    readonly bracketsPattern: RegExp = /\(([\d\+*-\\]*)\)/;

    ParseExpression(expression: string): number {
        let result: string = expression;

        if (result.search(this.bracketsPattern) > -1) {
            result = this.ParseBrackets(result);
        }

        if (result.search(this.simpleOperatorsPattern) > -1 || result.search(this.multOperatorsPattern) > -1) {
            result = this.Evaluate(result);
        }

        return parseInt(result);
    }

    private ParseBrackets(expression: string): string {
        let result: string = expression;
        let match = result.match(this.bracketsPattern)[1];
        let bracket = result.match(this.bracketsPattern)[0];
        let innerResult: string = this.Evaluate(match);

        result = result.replace(bracket, innerResult);

        if (result.search(this.bracketsPattern) > -1) {
            result = this.ParseBrackets(result);
        }

        return result;
    }

    private Evaluate(expression: string): string {
        let result: string = expression;

        if (result.search(this.multOperatorsPattern) > -1) {
            result = MathOps.PriorityOperation(result);

            if (result.search(this.multOperatorsPattern) > -1) {
                result = MathOps.PriorityOperation(result);
            }
        }

        if (result.search(this.simpleOperatorsPattern) > -1) {
            result = MathOps.SimpleOperation(result);

            if (result.indexOf("-") != 0 && result.search(this.simpleOperatorsPattern) > -1) {
                result = MathOps.SimpleOperation(result);
            }
        }

        return result.replace(/[\s]+/g, "");
    }
}
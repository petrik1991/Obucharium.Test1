export class MathOps{
    static readonly simpleOperation:RegExp = /\d+[\+-]\d+/;
    static readonly multOperation:RegExp = /\d+[*\/]\d+/;

    static SimpleOperation(expression: string): string {
        let evaluated: string = "";
        let result: string = expression;
        let regResult = this.simpleOperation.exec(result);
        let operands = regResult[0].match(/\d+/g);
        let operator = regResult[0].match(/[\+-]/)[0];

        switch (operator) {
            case "+":
                evaluated = (parseInt(operands[0]) + parseInt(operands[1])).toString();
                break;

            case "-":
                evaluated = (parseInt(operands[0]) - parseInt(operands[1])).toString();
                break;
        }

        return result.replace(regResult[0], evaluated);
    }

    static PriorityOperation(expression: string): string {
        let evaluated: string = "";
        let result: string = expression;
        let regResult = this.multOperation.exec(result);
        let operands = regResult[0].match(/\d+/g);
        let operator = regResult[0].match(/[*\/]/)[0];

        switch (operator) {
            case "*":
                evaluated = (parseInt(operands[0]) * parseInt(operands[1])).toString();
                break;

            case "/":
                evaluated = (parseInt(operands[0]) / parseInt(operands[1])).toString();
                break;
        }

        return result.replace(regResult[0], evaluated);
    }
}
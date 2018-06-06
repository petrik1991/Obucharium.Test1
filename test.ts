let multOperatorsPattern: RegExp = /[*\/]/g;
let simpleOperatorsPattern: RegExp = /[\+-]/g;
let bracketsPattern: RegExp = /\(([\d\+*-\\]*)\)/;

function ParseExpression(expression: string): number{
    let result: string = expression;

    if(result.search(bracketsPattern)> -1){
        result = ParseBrackets(result);
    }

    if(result.search(simpleOperatorsPattern) > -1 || result.search(multOperatorsPattern) > -1){
        result = Evaluate(result);
    }

    return parseInt(result);
}

function ParseBrackets(expression: string): string{
    let result: string = expression;
    let match = result.match(bracketsPattern)[1];
    let bracket = result.match(bracketsPattern)[0];
    let innerResult: string = Evaluate(match);

    result = result.replace(bracket, innerResult);

    if(result.search(bracketsPattern)> -1){
        result = ParseBrackets(result);
    }

    return result;
}

function Evaluate(expression: string): string{
    let result: string = expression;
    
    if(result.search(multOperatorsPattern) > -1){
        result = PriorityOperation(result);
    }

    if(result.search(simpleOperatorsPattern) > -1){
        result = SimpleOperation(result);
    }

    return result.replace(/[\s]+/g, "");
}

function SimpleOperation(expression: string): string{
    let eval: string = "";
    let result: string = expression;
    let simpleOperation = /\d+[\+-]\d+/;
    let regResult = simpleOperation.exec(result);
    let operands = regResult[0].match(/\d+/g);
    let operator = regResult[0].match(/[\+-]/)[0];

    switch (operator) {
        case "+":
            eval = (parseInt(operands[0]) + parseInt(operands[1])).toString();
            break;

        case "-":
            eval = (parseInt(operands[0]) - parseInt(operands[1])).toString();
            break;
    }

    result = result.replace(regResult[0], eval);
    if(result.indexOf("-") != 0 && result.search(simpleOperatorsPattern) > -1){
        result = SimpleOperation(result);
    }

    return result;
}

function PriorityOperation (expression: string): string{
    let eval: string = "";
    let result: string = expression;
    let multOperation = /\d+[*\/]\d+/;
    let regResult = multOperation.exec(result);
    let operands = regResult[0].match(/\d+/g);
    let operator = regResult[0].match(/[*\/]/)[0];

    switch (operator) {
        case "*":
            eval = (parseInt(operands[0]) * parseInt(operands[1])).toString();
            break;

        case "/":
            eval = (parseInt(operands[0]) / parseInt(operands[1])).toString();
            break;
    }

    result = result.replace(regResult[0], eval);
    if(result.search(multOperatorsPattern) > -1){
        result = PriorityOperation(result);
    }

    return result;
}

console.log(ParseExpression("(2+5)*(2+2*2/2)"));//28
console.log(ParseExpression("(3+2*2)+(2*2+(2+2))"));//15
console.log(ParseExpression("1+2"));//3
console.log(ParseExpression("2+2*2"));//6
console.log(ParseExpression("1-6/2"));//-2
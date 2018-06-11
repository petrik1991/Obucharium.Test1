import {Parser} from "./parser"

let parser: Parser = new Parser();
console.log(parser.ParseExpression("(2+5)*(2+2*2/2)"));//28
console.log(parser.ParseExpression("(3+2*2)+(2*2+(2+2))"));//15
console.log(parser.ParseExpression("1+2"));//3
console.log(parser.ParseExpression("2+2*2"));//6
console.log(parser.ParseExpression("1-6/2"));//-2
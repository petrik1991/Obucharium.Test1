var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function increment(target, propertyKey) {
    var val = this[propertyKey];
    var getValue = function () {
        val = val + 1;
        return val;
    };
    var setValue = function (value) {
        console.log("\u0412\u0432\u0435\u0434\u0435\u043D\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: " + value);
        val = value;
    };
    if (delete this[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
            get: getValue,
            set: setValue
        });
    }
}
var Value = /** @class */ (function () {
    function Value() {
    }
    Value.prototype.NewValue = function (value) {
        this.value = value;
    };
    __decorate([
        increment
    ], Value.prototype, "value", void 0);
    return Value;
}());
var val = new Value();
val.NewValue(2);
var num = val.value;
console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u043B\u0435 \u0433\u0435\u0442\u0442\u0435\u0440\u0430: " + num);
val.value = 5;
//# sourceMappingURL=main.js.map
function increment(target: Object, propertyKey: string){
    let val = this[propertyKey];

    var getValue = function(){
        val = val + 1;
        return val;
    }

    var setValue = function(value: Number){
        console.log(`Введенное значение: ${value}`);
        val = value;
    }

    if (delete this[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
            get: getValue,
            set: setValue
        });
    }
}

class Value{
    @increment
    value: Number;

    NewValue(value: Number){
        this.value = value;
    }
}

let val: Value = new Value()
val.NewValue(2);

let num: Number = val.value;
console.log(`Значение после геттера: ${num}`);

val.value = 5;
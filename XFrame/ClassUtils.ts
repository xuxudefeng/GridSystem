export class TypeNamePair {
    public static toString(inputClass: any, name: string = "") {
        if (inputClass.prototype) {
            if (name) {
                return `${inputClass.prototype.constructor.toString().match(/\w+/g)[1]}.${name};`
            }
            return inputClass.prototype.constructor.toString().match(/\w+/g)[1];
        }
        else {
            if (name) {
                return `${inputClass.constructor.toString().match(/\w+/g)[1]}.${name};`
            }
            return inputClass.constructor.toString().match(/\w+/g)[1];
        }
    }
}
export default class ErrorException {

    public message: string | object;
    public code: number;

    constructor(message: string | object, code: number){
        this.message = message;
        this.code = code;
    }
}
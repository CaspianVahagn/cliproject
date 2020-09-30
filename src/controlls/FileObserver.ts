export class DataObserver<T>{

    private value?: T;

    private callback?: ((value: T) => void) ;

    constructor() {
    }


    static of<P>(value: Promise<P>): DataObserver<P>{
        const obs = new DataObserver<P>();
        value.then(value1 => obs.setValue(value1));
        return obs;
    }

    public setValue(value:T){
        this.value = value;
        this.fire()
    }

    public onChange( callback:(value:T) => void ){
        this.callback= callback;
        this.fire();
    }

    private fire(){
        if(this.value && this.callback){
            this.callback(this.value)
        }
    }
}

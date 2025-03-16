
export class BroadcastingProcessDto {

    private constructor(
        public category: string,
        public message: string
    ){}

    static create = (object: { [ key:string ]: any }): [string?, BroadcastingProcessDto?] => {
        
        const { category, message } = object;
        
        if ( !category ) return ['Missing category'];
        if ( !message ) return ['Missing message']; 

        return [undefined, new BroadcastingProcessDto( category, message )];

    }

}
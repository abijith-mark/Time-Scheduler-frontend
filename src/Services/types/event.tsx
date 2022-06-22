export default interface Event{
    id?: any | null,
    users: Array<string>,
    title : string,
    desc : string,
    start : Date,
    end : Date,
    status : number,
    pending : Array<string>,
    remind : number
}
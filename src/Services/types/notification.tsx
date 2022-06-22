export default interface Notification{
    id?: any | null,
    from : string,
    to : Array<string>,
    eventId : string,
    message : string,
}
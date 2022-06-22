import axios from "./axios";
import requests from "./requests";
import {lastDayOfMonth} from "./actions/time"
import Event from "./types/event";

class Services {
  getDayEntry(date: Date) {
    return axios.get(requests.dayData + `day=${date.toISOString()}`);
  }
  getAll() {
    return axios.get(requests.returnAll);
  }
  getMonthEntry(date : Date){
    return axios.get(requests.getIntrevalData + `start=${date.toISOString()}&end=${lastDayOfMonth(date).toISOString()}`)
  }

  create(event : Event){
    return axios.post(requests.create,{
      id:event.id,
      users : event.users,
      title:event.title,
      desc:event.desc,
      start:event.start,
      end:event.end,
      status:event.status,
      pending:event.pending,
      remind:event.remind
    })
  }

  update(event : Event){
    return axios.put(requests.update,{
      id:event.id,
      users : event.users,
      title:event.title,
      desc:event.desc,
      start:event.start,
      end:event.end,
      status:event.status,
      pending:event.pending,
      remind:event.remind
    })
  }

  delete(id : string){
    return axios.delete(requests.del + `id=${id}`)
  }

  getNoti(){
    return axios.get(requests.getNoti);
  }

  acceptNoti(id : string){
    return axios.post(requests.acceptNoti + id);
  }

  rejectNoti(id : string){
    return axios.post(requests.rejectNoti + id);
  }
}

export default new Services();

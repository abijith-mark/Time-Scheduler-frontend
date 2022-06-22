import axios from "axios";

const API_URL : string = "http://localhost:3000/v1/";

class AuthService {
   login = (username : string, password : string) => {
    return axios
      .post(API_URL + "auth/signin", {
        username,
        password
      })
      .then((response) => {
        if (response.data.username) {
          console.log("sett");
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data.username));
        }
        return response.data.username
      });
  }

  logout() {
    axios.post(API_URL + "auth/signout");
    localStorage.removeItem("user");
  }

  register(username : string, email : string, password : string) {
    return axios.post(API_URL + "auth/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if(user!=null){
        return JSON.parse(user);
    }
    return {};
  }
}

export default new AuthService();
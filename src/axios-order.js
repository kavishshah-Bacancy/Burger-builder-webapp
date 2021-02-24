import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-4746-default-rtdb.firebaseio.com/",
});

export default instance;

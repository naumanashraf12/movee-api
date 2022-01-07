import Axios from "axios";
export default Axios.create({
  baseURL: "http://localhost:8600",
});

export const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    Axios.defaults.headers.common["x-access-token"] = token;
  } else {
    // Delete auth header
    delete Axios.defaults.headers.common["x-access-token"];
  }
};

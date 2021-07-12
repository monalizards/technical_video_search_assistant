import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID GeAKG07NSxjQFzjSF4Q3qGro51-RbZIrNgB2Mt5H4ws",
  },
});

import axios from "axios";

async function petsAPI() {
  const res = await axios.get("http://localhost:3080/pet/search");
  return res.data;
}

export { petsAPI };

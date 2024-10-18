import axios from "axios";
import apiURL from "../api.js";
import { getToken, getInsufficientToken} from "./TokenService.js"


const getItems = async () => {


// DEMO: If token does not contain correct signature/permissions 
// it fails to authorize us on our endpoint
const tokenResponse = await getInsufficientToken();
// const tokenResponse = await getToken();
console.log("TOKEN! " + tokenResponse.access_token);

// DEMO: api call has to use our token, which contains the correct permissions like 
  
  const options = {
    method: "GET",
    url: "http://localhost:3000/items",
    headers: { authorization: `Bearer ${tokenResponse.access_token}` },
  };

  const response = await axios(options);
  return response.data;
};

const createItem = async (newItem) => {
  try {
    const response = await axios.post(`${apiURL}/items`, newItem);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`${apiURL}/items/${id}`);
    console.log("deleted item");
  } catch (error) {
    console.log(error.message);
  }
};

const editItem = async (id, edittedItem) => {
  try {
    const response = await axios.put(`${apiURL}/items/${id}`, edittedItem);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export default { createItem, deleteItem, getItems, editItem };

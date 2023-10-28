import axios from 'axios';

const url = 'https://653b817d2e42fd0d54d539d4.mockapi.io/api/v1/product';

export default async function deleteProducts(id) {
  try {
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

import axios from 'axios';

const url = 'https://653b817b2e42fd0d54d539c2.mockapi.io/api/v1/product';

export default async function getProducts() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
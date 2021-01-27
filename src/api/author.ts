import axios from 'axios';

import { Author } from '../interfaces/blog';
export const getAuthorById = async (id: number): Promise<Author | void> => {
  try {
    const res = await axios.get<Author>(`https://hammer.forexco.com.au/wp-json/wp/v2/users/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getAuthors = (): void => {
  axios
    .get<Author[]>('https://hammer.forexco.com.au/wp-json/wp/v2/users')
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.error(err));
};

import { createContext } from 'react';
//types
import { Post } from './interfaces/blog';
export const PostContext = createContext<Post[] | void>([]);

import { createContext } from 'react';
//types
import { PostContent } from './interfaces/blog';
export const PostContext = createContext<PostContent[] | void>([]);

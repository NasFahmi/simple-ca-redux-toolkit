import { PostStorage } from '@/data/datasources/local/postLocal/post_local';
import { PostApi } from '@/data/datasources/remote/postApi/post_api';
import { container } from 'tsyringe';
import { POST_API, POST_STORAGE } from './tokens';
container.registerSingleton(POST_API, PostApi);
container.registerSingleton(POST_STORAGE, PostStorage); // Register PostStorage as a singleton
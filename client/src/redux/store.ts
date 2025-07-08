import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose,type  Reducer } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authreducer';
import { type authState } from '@/types';
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
   auth: authReducer as unknown as Reducer<authState>,
 });

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
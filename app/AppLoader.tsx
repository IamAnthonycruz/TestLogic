// app/AppLoader.tsx
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {LOAD_FILE_REQUEST} from '../redux/actions';
import Main from './Main';

const AppLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: LOAD_FILE_REQUEST});
  }, [dispatch]); // only fires once when AppLoader mounts

  return <Main />;
};

export default AppLoader;

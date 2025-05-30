import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {store} from './redux/store';
import {loadFile} from './redux/actions';
import {SafeAreaView, Text} from 'react-native';

import {database} from './database';
import Item from './model/Item';

const Main = () => {
  useEffect(() => {
    const testDB = async () => {
      try {
        const itemCollection = database.get<Item>('items');

        await database.action(async () => {
          await itemCollection.create(record => {
            record.name = 'Test';
            record.value = '42';
          });
        });

        const results = await itemCollection.query().fetch();
        console.log('📦 DB contents after insert:', results);
      } catch (e) {
        console.log('❌ DB test error:', e);
      }
    };

    testDB();
  }, []);

  return (
    <SafeAreaView>
      <Text>Loading file into WatermelonDB...</Text>
    </SafeAreaView>
  );
};

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;

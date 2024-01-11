export default function localStoragePlugin({store, options}) {
  store.$subscribe((mutation, state) => {
    for (const propertyName in state) {
      console.log('|' + (options.cache ? options.cache.getParts.stateKey : "n/d") + '| store ' + mutation.storeId + ' is mutating property: ' + propertyName + ' * new state is: ' + state[propertyName]);
    }
  })

  store.$onAction(({name, store, args, after, onError}) => {
    console.log('***' + name);
    if (options.cache && options.cache[name]) {
      const loadingKeyName = options.cache[name].loadingStateKey;
      store[loadingKeyName] = true;
      after((results) => {
        store[loadingKeyName] = false;
      });
      onError(() => {
        store[loadingKeyName] = false;
      })
    }
  });

  return {
    cacheKeyPrefix: 'robot-shop',
    getVersion() {
      return '1.0'
    }
  }
}

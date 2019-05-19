function setState(newState) {
  this.state = { ...this.state, ...newState };
  this.listeners.forEach((listener) => {
    // istanbul ignore next
    listener(this.state);
  });
}

function useCustom(React) {
  const newListener = React.useState()[1];
  React.useEffect(() => {
    this.listeners.push(newListener);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== newListener);
    };
  }, []);
  return [this.state, this.actions];
}

function associateActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach((key) => {
    // istanbul ignore next
    if (typeof actions[key] === 'function') {
      associatedActions[key] = actions[key].bind(null, store);
    }
    // istanbul ignore next
    if (typeof actions[key] === 'object') {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useStore = (React, initialState, actions, initializer) => {
  const store = { state: initialState, listeners: [] };
  store.setState = setState.bind(store);
  store.actions = associateActions(store, actions);
  // istanbul ignore next
  if (initializer) initializer(store);
  return useCustom.bind(store, React);
};

export default useStore;

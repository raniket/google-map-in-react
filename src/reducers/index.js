// example
const initState = {
  user: null,
  resource: [],
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_RESOURCE':
      return { ...state, loading: true };
    case 'RESOURCE_RECEIVED':
      return { ...state, resource: action.resource, resourceReceived: true, loading: false };
    case 'RESOURCE_RECEIVED_FAILED':
      return { ...state, resourceReceived: false, loading: false };

    case 'UPDTE_CURRENTPATH':
      return { ...state, currentPath: action.path }
    default:
      return state;
  }
}

export default reducer;
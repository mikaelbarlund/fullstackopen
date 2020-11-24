const reducer = (state = "", action) => {
  switch (action.type) {
    case 'FILTER':
      return action.filter
    default: return state
  }
}


export const filter = (filter) => {
  return {
    type: 'FILTER',
    filter: filter
  }
}

export default reducer
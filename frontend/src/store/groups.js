import { csrfFetch } from './csrf';

const GET_GROUPS = 'groups/getGroups';
const GET_SINGLE_GROUP = 'group/getGroupById'

export const populateGroups = (groups) => {
  return {
    type: GET_GROUPS,
    groups
  };
};

export const populateSingleGroup = (group) => {
  return {
    type: GET_SINGLE_GROUP,
    group
  }
}




export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups')
  if (response.ok){
    const data = await response.json();
  dispatch(populateGroups(data));
  return data
  };
};

export const getGroupById = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${id}`)
  if (response.ok){
    const data = await response.json();
    dispatch(populateSingleGroup(data));
    return data
  }
};

const initialState = {};

const groupsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_GROUPS:
      newState = Object.assign({}, state);
      action.groups.Groups.forEach(group => {
        newState[group.id] = group
      });
      return newState;
    case GET_SINGLE_GROUP:
      newState = Object.assign({}, state);
      newState[action.group.id] = action.group
      return newState;
    default:
      return state;
  }
};

export default groupsReducer;

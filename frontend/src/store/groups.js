import { csrfFetch } from "./csrf";
import { normalizeDate } from "./events";

const GET_GROUPS = "groups/getGroups";
const GET_SINGLE_GROUP = "group/getGroupById";
const CREATE_GROUP = "group/createGroup";
const DELETE_GROUP = "group/deleteGroup";
const ADD_GROUP_IMAGE = "group/addImage";
const GET_EVENTS = "group/getEvents";
const REQUEST_MEMBERSHIP = "group/requestMembership";
const APPROVE_MEMBERSHIP = "group/approveMembership";
const DENY_MEMBERSHIP = "group/denyMembership";

const populateGroups = (groups) => {
  return {
    type: GET_GROUPS,
    groups,
  };
};

const populateSingleGroup = (singleGroup) => {
  return {
    type: GET_SINGLE_GROUP,
    singleGroup,
  };
};

const createGroup = (newGroup) => {
  return {
    type: CREATE_GROUP,
    newGroup,
  };
};

const deleteSingleGroup = (groupId) => {
  return {
    type: DELETE_GROUP,
    groupId,
  };
};

const addGroupImageAction = (image, groupId) => {
  return {
    type: ADD_GROUP_IMAGE,
    image,
    groupId,
  };
};

const getGroupEvents = (events) => {
  return {
    type: GET_EVENTS,
    events,
  };
};

const requestMembershipAction = (membership) => {
  return {
    type: REQUEST_MEMBERSHIP,
    membership,
  };
};

const approveMembershipAction = (membership) => {
  return {
    type: APPROVE_MEMBERSHIP,
    membership,
  };
};

const denyMembershipAction = (memberId) => {
  return {
    type: DENY_MEMBERSHIP,
    memberId,
  };
};

export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups");
  if (response.ok) {
    const data = await response.json();
    dispatch(populateGroups(data));
    return data;
  }
};

export const getGroupById = (id) => async (dispatch) => {
  const groupsResponse = await csrfFetch(`/api/groups/${id}`);
  if (groupsResponse.ok) {
    const data = await groupsResponse.json();
    dispatch(populateSingleGroup(data));
    return data;
  }
};

export const groupCreator = (body, userId) => async (dispatch) => {
  const { name, about, privateBoolean, type, city, state } = body;
  const response = await csrfFetch("/api/groups", {
    method: "POST",
    body: JSON.stringify({
      name,
      about,
      type,
      city,
      state,
      private: privateBoolean,
      organizerId: userId,
    }),
  });
  console.log("response", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(createGroup(data));
    return data;
  }
};

export const groupUpdater = (body, groupId) => async (dispatch) => {
  const { name, about, privateBoolean, type, city, state } = body;
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      about,
      type,
      city,
      state,
      private: privateBoolean,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getGroupById(data.id));
    return data;
  }
};

export const groupDelete = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSingleGroup(groupId));
    return data;
  }
};

export const addGroupImage = (body, groupId) => async (dispatch) => {
  const { url, preview } = body;
  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: "POST",
    body: JSON.stringify({
      url,
      preview,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addGroupImageAction(data, groupId));
    return data;
  }
};

export const getGroupEventsById = (id) => async (dispatch) => {
  const eventsResponse = await csrfFetch(`/api/groups/${id}/events`);
  if (eventsResponse.ok) {
    const data = await eventsResponse.json();
    dispatch(getGroupEvents(data));
    return data;
  }
};

export const requestMembership = (groupId) => async (dispatch) => {
  const membershipResponse = await csrfFetch(
    `/api/groups/${groupId}/membership`,
    { method: "POST" }
  );
  if (membershipResponse.ok) {
    const data = await membershipResponse.json();
    dispatch(requestMembershipAction(data));
    return data;
  }
};

export const approveMembership = (groupId, memberId) => async (dispatch) => {
  const membershipResponse = await csrfFetch(
    `/api/groups/${groupId}/membership`,
    {
      method: "PUT",
      body: JSON.stringify({
        memberId,
        status: "member",
      }),
    }
  );
  if (membershipResponse.ok) {
    const data = await membershipResponse.json();
    dispatch(approveMembershipAction(data));
    return data;
  }
};

export const denyMembership = (groupId, memberId) => async (dispatch) => {
  const membershipResponse = await csrfFetch(
    `/api/groups/${groupId}/membership`,
    {
      method: "DELETE",
      body: JSON.stringify({ memberId }),
    }
  );
  if (membershipResponse.ok) {
    const data = await membershipResponse.json();
    dispatch(denyMembershipAction(memberId));
    return data;
  }
};

const initialState = {};

const groupsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_GROUPS:
      newState = Object.assign({}, state);
      newState.allGroups = {};
      action.groups.Groups.forEach((group) => {
        newState.allGroups[group.id] = group;
      });
      return newState;
    case GET_SINGLE_GROUP:
      newState = Object.assign({}, state);
      newState.singleGroup = action.singleGroup;
      let membersNormalized = {};
      let pendingMembersNormalized = {};
      action.singleGroup.Members.forEach((member) => {
        const data = {
          firstName: member.firstName,
          lastName: member.lastName,
          id: member.id,
          status: member.Membership[0].status,
        };
        data.status === "pending"
          ? (pendingMembersNormalized[data.id] = data)
          : (membersNormalized[data.id] = data);
      });
      newState.singleGroup.Members = membersNormalized;
      newState.singleGroup.PendingMembers = pendingMembersNormalized;
      return newState;
    case CREATE_GROUP:
      newState = Object.assign({}, state);
      newState.allGroups[action.newGroup.id] = action.newGroup;
      return newState;
    case DELETE_GROUP:
      newState = Object.assign({}, state);
      delete newState.allGroups[action.groupId];
      newState.allGroups = Object.values(newState.allGroups).filter(
        (id) => id !== action.groupId
      );
      return newState;
    case ADD_GROUP_IMAGE:
      newState = Object.assign({}, state);
      newState.allGroups[action.groupId].previewImage = action.image.url;
      newState.singleGroup.GroupImages.push(action.image);
      return newState;
    case GET_EVENTS:
      newState = Object.assign({}, state);
      newState.singleGroupEvents = {};
      action.events.Events.forEach((event) => {
        event.startDate = normalizeDate(event.startDate);
        event.endDate = normalizeDate(event.endDate);
        newState.singleGroupEvents[event.id] = event;
      });
      return newState;
    case REQUEST_MEMBERSHIP:
      newState = Object.assign({}, state);
      newState.singleGroup.PendingMembers[action.membership.memberId] = {
        id: action.membership.memberId,
        status: action.membership.status,
      };
      return newState;
    case APPROVE_MEMBERSHIP:
      newState = Object.assign({}, state);
      newState.singleGroup.Members[action.membership.memberId] =
        action.membership;
      delete newState.singleGroup.PendingMembers[action.membership.memberId];
      return newState;
    case DENY_MEMBERSHIP:
      newState = Object.assign({}, state);
      delete newState.singleGroup.PendingMembers[action.memberId];
      return newState;
    default:
      return state;
  }
};

export default groupsReducer;

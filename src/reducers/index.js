export const initialState = {
	meetingID: 0,
};

export const reducer = (state = initialState, action) => {
	if (typeof state === "undefined") {
		return 0;
	}

	if (action.type === "NEW_MEETING_ID") {
		return Object.assign({}, state, {
      		meetingID: action.payLoad.id
    	});
	} else {
		return initialState;
	}
};

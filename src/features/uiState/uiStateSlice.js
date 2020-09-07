import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modals: {
		add: {
			isShown: false,
		},
		rename: {
			isShown: false,
			channelId: null,
		},
		remove: {
			isShown: false,
			channelId: null,
		}
	}
}

const uiStateSlice = createSlice({
	name: 'uiState',
	initialState,
	reducers: {
		showAddModal(state) {
			state.modals.add.isShown = true;
		},
		hideAddModal(state) {
			state.modals.add.isShown = false;
		},
		showRenameModal(state, action) {
			const { channelId } = action.payload;
			state.modals.rename = {
				isShown: true,
				channelId
			}
		},
		hideRenameModal(state) {
			state.modals.rename = {
				isShown: false,
				channelId: null
			}
		},
		showRemoveModal(state, action) {
			const { channelId } = action;
			state.modals.remove = {
				isShown: true,
				channelId
			}
		},
		hideRemoveModal(state) {
			state.modals.remove = {
				isShown: false,
				channelId: null
			}
		},
	}
})

export const { showAddModal, hideAddModal, showRenameModal, hideRenameModal, showRemoveModal, hideRemoveModal } = uiStateSlice.actions;

export default uiStateSlice.reducer;

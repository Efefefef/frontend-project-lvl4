import { createSlice } from '@reduxjs/toolkit';

const uiStateSlice = createSlice({
	name: 'uiState',
	initialState: {
		modalShown: null,
	},
	reducers: {
		showAddModal(state) {
			state.modalShown = 'add';
		},
		showRenameModal(state) {
			state.modalShown = 'rename';
		},
		showRemoveModal(state) {
			state.modalShown = 'remove';
		},
		hideModal(state) {
			state.modalShown = null;
		},
	}
});

export const { showAddModal, showRenameModal, showRemoveModal, hideModal } = uiStateSlice.actions;

export default uiStateSlice.reducer;

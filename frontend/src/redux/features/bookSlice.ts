import { createSlice } from '@reduxjs/toolkit';
import { CampgroundItem } from '@/interface';
import { PayloadAction } from '@reduxjs/toolkit';

type CampgroundState = {
	campgroundItems: CampgroundItem[]
}

const initialState: CampgroundState = {
	campgroundItems: []
}

export const campgroundSlice = createSlice({
	name: 'campground',
	initialState,
	reducers: {
		addBooking: (state, action:PayloadAction<CampgroundItem>) => {
			state.campgroundItems.push(action.payload)
		},
		removeBooking: (state, action:PayloadAction<CampgroundItem>) => {
			const remainItems = state.campgroundItems.filter(elem => {
				return elem.campgroundId !== action.payload.campgroundId
			})
			state.campgroundItems = remainItems
		}
	}
})

export const {addBooking, removeBooking} = campgroundSlice.actions
export default campgroundSlice.reducer
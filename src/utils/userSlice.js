import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userLocation",
    initialState: {
        cityName: "Udaipur, Rajasthan",
        displayName: "Udaipur, Rajasthan",
        latitude: "24.585445",
        longitude: "73.712479"
    },
    reducers: {
        setUserLocation : (state, action)=>{
            state.cityName = action.payload.name
            state.displayName = action.payload.display_name
            state.latitude = action.payload.lat
            state.longitude = action.payload.lon
        }
    }
})

export const { setUserLocation } = userSlice.actions;
export default userSlice.reducer;

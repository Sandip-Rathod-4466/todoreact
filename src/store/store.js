import getAllTasksSlice from "./taskThunk"
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer:{
        allTasks:getAllTasksSlice,
    }
})

export default store;
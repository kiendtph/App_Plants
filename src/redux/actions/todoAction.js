import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTodosByCategory } from "../reducers/todoReducer";

// const api_url = 'http://192.168.55.12:3000';
const api_url = 'http://10.24.11.40:3000';
export const fetchTodos = () => {
    return async dispatch => {
        try {
            const res = await fetch(`${api_url}/plants`);
            const data = await res.json();
            dispatch(addTodosByCategory({ category: 'plants', data }));
        } catch (error) {
            console.error("Lỗi lấy ds từ API: ", error);
        }
    }
}

export const fetchTodos1 = () => {
    return async dispatch => {
        try {
            const res = await fetch(`${api_url}/plant_pots`);
            const data = await res.json();
            dispatch(addTodosByCategory({ category: 'plant_pots', data }));
        } catch (error) {
            console.error("Lỗi lấy ds từ API: ", error);
        }
    }
}
export const fetchTodos2 = () => {
    return async dispatch => {
        try {
            const res = await fetch(`${api_url}/accessory`);
            const data = await res.json();
            dispatch(addTodosByCategory({ category: 'accessory', data }));
        } catch (error) {
            console.error("Lỗi lấy ds từ API: ", error);
        }
    }
}
// api san pham yeu thich
export const fetchFavoriteProApi = () => {
    return async dispatch => {
        try {
            const res = await fetch(`${api_url}/Favorites`);
            const data = await res.json();
            dispatch(addTodosByCategory({ category: 'Favorites', data }));
        } catch (error) {
            console.error("Lỗi lấy ds từ API: ", error);
        }
    }
}
export const addFavoriteProductApi = createAsyncThunk(
    'todo/addFavoriteProductApi',
    async (objTodo, thunkAPI) => {
        console.log(objTodo);
        try {
            const res = await fetch(`${api_url}/Favorites`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objTodo)
            });
            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                const errData = await res.json();
                return thunkAPI.rejectWithValue(errData);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
);
export const deleteFavoriteProductApi = createAsyncThunk(
    'todo/deleteFavoriteProductApi',
    async (id, thunkAPI) => {
        try {
            const res = await fetch(`${api_url}/Favorites/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                return id;
            } else {
                const err = await res.json()
                return thunkAPI.rejectWithValue(err);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
// api comment user
export const addCommentUserApi = createAsyncThunk(
    'todo/addCommentUserApi',
    async (objTodo, thunkAPI) => {
        console.log(objTodo);
        try {
            const res = await fetch(`${api_url}/Comments`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objTodo)
            });
            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                const errData = await res.json();
                return thunkAPI.rejectWithValue(errData);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
);
export const deleteCommentUserApi = createAsyncThunk(
    'todo/deleteCommentUserApi',
    async (id, thunkAPI) => {
        try {
            const res = await fetch(`${api_url}/Comments/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                return id;
            } else {
                const err = await res.json()
                return thunkAPI.rejectWithValue(err);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const updateCommentUserApi = createAsyncThunk(
    'todo/updateCommentUserApi',
    async (objUpdate, thunkAPI)=>{
        try {
            const res = await fetch(`${api_url}/Comments/${objUpdate.id}`,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(objUpdate.data)
            });
            const data = await res.json();
            if(res.ok){
                return data;
            }else{
                const errData = await res.json();
                return thunkAPI.rejectWithValue(errData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const fetchCommentUserApi = () => {
    return async dispatch => {
        try {
            const res = await fetch(`${api_url}/Comments`);
            const data = await res.json();
            dispatch(addTodosByCategory({ category: 'Comments', data }));
        } catch (error) {
            console.error("Lỗi lấy ds từ API: ", error);
        }
    }
}
//user
export const fetchUserApi = () => {
    return async dispatch => {
        try {
            const res = await fetch(`${api_url}/Users`);
            const data = await res.json();
            dispatch(addTodosByCategory({ category: 'Users', data }));
        } catch (error) {
            console.error("Lỗi lấy ds từ API: ", error);
        }
    }
}
export const addUserApi = createAsyncThunk(
    'todo/addUserApi',
    async (objUser, thunkAPI) => {
        console.log(objUser);
        try {
            const res = await fetch(`${api_url}/Users`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objUser)
            });
            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                const errData = await res.json();
                return thunkAPI.rejectWithValue(errData);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
);
export const updateUserApi = createAsyncThunk(
    'todo/updateUserApi',
    async (objUpdate, thunkAPI)=>{
        try {
            const res = await fetch(`${api_url}/Users/${objUpdate.id}`,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(objUpdate.data)
            });
            const data = await res.json();
            if(res.ok){
                return data;
            }else{
                const errData = await res.json();
                return thunkAPI.rejectWithValue(errData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
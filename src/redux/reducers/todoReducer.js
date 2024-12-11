import { createSlice } from "@reduxjs/toolkit";
import { addCommentUserApi, addFavoriteProductApi, addUserApi, deleteCommentUserApi, deleteFavoriteProductApi, fetchUserApiById, updateCommentUserApi, updateUserApi } from "../actions/todoAction";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        plants: [],
        plant_pots: [],
        accessory: [],
        Favorites: [],
        Comments: [],
        Users: [],
        viewedProducts: []
    },
    reducers: {
        addTodosByCategory(state, action) {
            const { category, data } = action.payload;
            state[category] = data;
        },
        addViewedProduct(state, action) {
            const product = action.payload;
            state.viewedProducts = [
                product,
                ...state.viewedProducts.filter(item => item.id !== product.id)
            ].slice(0, 10); // Giữ tối đa 10 sản phẩm
        }
    },
    extraReducers: builder => {
        builder.addCase(addFavoriteProductApi.fulfilled, (state, action) => {
            state.Favorites.push(action.payload);

        })
            .addCase(addFavoriteProductApi.rejected, (state, action) => {
                console.log("Add todo rejected: ", action.error.message);

            }),
            builder.addCase(deleteFavoriteProductApi.fulfilled, (state, action) => {
                state.Favorites = state.Favorites.filter(row => row.id != action.payload);
            })
        builder.addCase(deleteFavoriteProductApi.rejected, (state, action) => {
            console.log("Lỗi xóa: ", action.error.message);

        }),
            builder.addCase(addCommentUserApi.fulfilled, (state, action) => {
                state.Comments.push(action.payload);
            })
                .addCase(addCommentUserApi.rejected, (state, action) => {
                    console.log("Add to comment: ", action.error.message);

                }),
            builder.addCase(deleteCommentUserApi.fulfilled, (state, action) => {
                state.Comments = state.Comments.filter(row => row.id != action.payload);
            })
        builder.addCase(deleteCommentUserApi.rejected, (state, action) => {
            console.log("Lỗi xóa: ", action.error.message);

        }),
            builder.addCase(updateCommentUserApi.fulfilled, (state, action) => {
                const { id, content } = action.payload;
                const todo = state.Comments.find(row => row.id === id);
                if (todo) {
                    todo.content = content;
                }
            })
                .addCase(updateCommentUserApi.rejected, (state, action) => {
                    console.log("Update Comment Product: ", action.error.message);

                }),

            builder.addCase(addUserApi.fulfilled, (state, action) => {
                state.Users.push(action.payload);
            })
                .addCase(addUserApi.rejected, (state, action) => {
                    console.log("Add todo rejected: ", action.error.message);

                }),
            builder.addCase(updateUserApi.fulfilled, (state, action) => {
                const { id, password } = action.payload;  
                const todo = state.Users.find(row => row.id === id);
                if (todo) {
                    todo.password = password;  
                }
            })
                .addCase(updateUserApi.rejected, (state, action) => {
                    console.log("Update user : ", action.error.message);

                })
    }
});
export const { addTodosByCategory, addViewedProduct } = todoSlice.actions;

export default todoSlice.reducer;
import axios from 'axios';
import React from 'react';
import logger from 'redux-logger';
import thunk from 'redux-thunk'

const Todos = () => {
    // async actions - api calling
    // api url - https://jsonplaceholder.typicode.com/todos
    // middleware- redux-thunk
    // axios api

    const { createStore, applyMiddleware } = require('redux');

    // define constants
    const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST';
    const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
    const GET_TODOS_FAILED = 'GET_TODOS_FAILED';
    const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

    // define state
    const initialTodos = {
        todos: [],
        isLoading: false,
        error: null
    }

    // define action
    const getTodosRequest = () => {
        return {
            type: GET_TODOS_REQUEST
        }
    }

    const getTodosSuccess = (todos) => {
        return {
            type: GET_TODOS_SUCCESS,
            payload: todos
        }
    }

    const getTodosFailed = (error) => {
        return {
            type: GET_TODOS_FAILED,
            payload: error
        }
    }

    // todos reducer
    const todosReducer = (state = initialTodos, action) => {
        switch (action.type) {
            case GET_TODOS_REQUEST:
                return {
                    ...state,
                    isLoading: true
                }

            case GET_TODOS_SUCCESS:
                return {
                    ...state,
                    todos: action.payload,
                    isLoading: false
                }

            case GET_TODOS_FAILED:
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }

            default:
                return state;
        }
    };


    // async action creator
    // thunk-middleware allows us to return a function instead of object
    const fetchData = () => {
        return (dispatch) => {
            dispatch(getTodosRequest());
            axios.get(TODOS_URL)
                .then(res => {
                    const todos = res.data;
                    const title = todos.map(todo => todo.title);
                    dispatch(getTodosSuccess(title))
                })
                .catch(err => {
                    const errorMessage = err.message;
                    dispatch(getTodosFailed(errorMessage));
                })
        }
    }

    //store
    const store = createStore(todosReducer, applyMiddleware(thunk, logger));

    store.subscribe(() => {
        console.log(store.getState());
    });

    store.dispatch(fetchData())

    return (
        <div>
            <h1>Fetch Api with thunk</h1>
            <h4 style={{color: 'red'}}>Note: See in console</h4>
        </div>
    );
};

export default Todos;
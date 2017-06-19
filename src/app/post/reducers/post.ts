import * as post from './../actions/post';
import { Post } from "./../post.model";

import * as _ from 'lodash';
import { ActionReducer } from "@ngrx/store";

import { createSelector } from 'reselect'

export interface State {
    ids: number[];
    entities: { [id:number]: Post };
    selectedId?: number,
    loading: boolean;
    loaded: boolean;
}

export const initialState: State = {
    ids: [],
    entities: {},
    selectedId: -1,
    loading: false,
    loaded: false
}

export function reduce(state = initialState, action: post.Actions): State {
    console.log(action.type);
    switch(action.type){
        case post.LOAD: {
            return { 
                ids: state.ids,
                entities: _.assign({}, state.entities),
                selectedId: state.selectedId,
                loading: true,
                loaded: false
             }
        }
        case post.LOAD_SUCCESS:
        case post.ADD_SUCCESS:
        case post.DELETE_FAIL: {
            const posts: Post[] = action.payload;
            const newPosts          = _.filter(posts, (post:Post) => { return !state.entities[post.id] });
            const newPostsIds       = _.map(newPosts , 'id');
            const newPostEntities   = _.reduce(newPosts, (entities: { [id:number]: Post }, post: Post) => { 
                return _.assign(entities, { [post.id]: post } )
            }, {})

            return { 
                ids: [...state.ids, ...newPostsIds],
                entities: _.assign({}, state.entities, newPostEntities),
                selectedId: state.selectedId,
                loading: false,
                loaded: true
             }
        }
        case post.LOAD_FAIL: {

        }

        case post.ADD_FAIL:
        case post.DELETE: {
            let postToDelete: Post = action.payload;
            const ids           = _.filter(state.ids, (postId) => { return postId !== postToDelete.id })
            const filteredPosts = _.reduce(
                _.map(ids, (id) => { 
                    return state.entities[id] 
                }), (entities: { [id:number]: Post }, post: Post) => {
                    return _.assign(entities, { [post.id]: post } ) 
            }, {})
            console.log(filteredPosts);
            return {
                ids: [...ids],
                entities: _.assign({}, filteredPosts),
                selectedId: state.selectedId,
                loading: true,
                loaded: true
            }
        }

        case post.DELETE_SUCCESS: 
        case post.ADD:{
            return {
                ids: state.ids,
                entities: state.entities,
                selectedId: state.selectedId,
                loading: false,
                loaded: true                
            }
        }

        case post.SELECT_POST: {
            let selectedPost: number = action.payload;
            return {
                ids: state.ids,
                entities: state.entities,
                selectedId: selectedPost,
                loading: false,
                loaded: true                
            }
        }

        default: {
            return state;
        }
    }
}

export const getIds         = (state: State) => state.ids;
export const getEntities    = (state: State) => state.entities;
export const getLoading     = (state: State) => state.loading;
export const getLoaded      = (state: State) => state.loaded;
export const getSelectedId  = (state: State) => state.selectedId;

export const getPosts       = createSelector(getEntities, getIds, (entities, ids) => {
    return _.map(ids, (id:number) => { return entities[id] }) 
});

export const getSelectedPost = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});
import * as post from './../actions/post';
import { Post } from "./../post.service";

import * as _ from 'lodash';
import { ActionReducer } from "@ngrx/store";

export interface State {
    ids: number[];
    entities: { [id:number]: Post };
    loading: boolean;
    loaded: boolean;
}

export const initialState: State = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false
}

export const reduce: ActionReducer<State> = (state = initialState, action: post.Actions) => {
    switch(action.type){
        case post.LOAD: {
            console.log(action.type);
            return { 
                ids: state.ids,
                entities: _.assign({}, state.entities),
                loading: true,
                loaded: false
             }
        }
        case post.LOAD_SUCCESS: {
            console.log(action.type);
            const posts: Post[] = action.payload;
            const newPosts          = _.filter(posts, (post:Post) => { return !state.entities[post.id] });
            const newPostsIds       = _.map(newPosts , 'id');
            const newPostEntities   = _.reduce(newPosts, (entities, post: Post) => { 
                return _.assign(entities, { [post.id]: post } ) 
            }, {})

            return { 
                ids: [...state.ids, newPosts.id],
                entities: _.assign({}, state.entities, newPostEntities),
                loading: false,
                loaded: true
             }
        }
        case post.LOAD_FAIL: {

        }
    }
}

export const getIds         = (state: State) => state.ids;
export const getEntities    = (state: State) => state.entities;
export const getLoading     = (state: State) => state.loading;
export const getLoaded      = (state: State) => state.loaded;
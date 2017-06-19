import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { Post } from './post.model'

const url: string = "http://localhost:3000/posts"

@Injectable()
export class PostService {
    constructor(private http: Http) { }
    
    getAll(): Observable<Post[]> {
        return this.http.get(url).map(res => res.json())
    }

    get(id:number): Observable<Post>{
        return this.http.get(`${url}/${id}`).map(res => res.json())
    }

    addNew(post:Post){
        return this.http.post(url, post).map(res => res.json())
    }

    delete(id:number){
        return this.http.delete(`${url}/${id}`).map(res => res.json())
    }
}
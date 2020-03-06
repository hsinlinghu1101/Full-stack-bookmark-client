import React from 'react';
import {Link} from 'react-router-dom';
import BookmarksContext from '../BookmarksContext';
import config from '../config';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';

export default class BookmarkItem extends React.Component {

  
  static contextType = BookmarksContext

 handleDelete=(event)=>{
   const bookmarkId = this.props.id
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
     method:'DELETE',
     headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${config.API_KEY}`
    }
  })
   .then(res => {
     if(!res.ok){
       return res.json().then(error => Promise.reject(error))
     }
   })
   .then(()=> {
     this.context.deleteBookmark(bookmarkId)
     this.props.history.push('/')
   })
   .catch(error =>{
     console.log(error)
   })
}
render(){

  const { title, desc, url, id, rating } = this.props

  return (
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'>
            {title}
          </a>
        </h3>
        <Rating value={rating} />
      </div>
      <p className='BookmarkItem__description'>
        {desc}
      </p>
      <div className='BookmarkItem__buttons'>
       <Link to={`/edit-bookmark/${id}`}>
        <button
          className='BookmarkItem__description'
        >
          Edit
        </button>
        </Link>
        <button
          className='BookmarkItem__description'
          onClick={(e) =>this.handleDelete(e)
          }
        >
          Delete
        </button>
      </div>
    </li>
  )
        }
}


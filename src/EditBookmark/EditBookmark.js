import React, { Component } from  'react';
import config from '../config'
import BookmarksContext from '../BookmarksContext';
import './EditBookmark.css';

const Required = () => (
  <span className='EditBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static defaultProps = {
    onEditBookmark: () => {}
  };

  static contextType = BookmarksContext

  state = {
    id:'',
    title:'',
    url:'',
    description:'',
    rating:''
  };

 
  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmarkId = this.props.match.params.bookmarkId
    const bookmark = {
      id:bookmarkId,
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }
    
    fetch(`${config.API_ENDPOINT}/${bookmarkId}`, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      }
    })
      
      .then(() => {
        this.context.updateBookmark(bookmark)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error.message)
      })
  }

  onClickCancel=()=>{
    this.props.history.push('/')
  }

  changeTitle=(e)=>{
   this.setState({
     title:e.target.value
   })
   console.log(this.state.title)
  }
  changeUrl=(e)=>{
    this.setState({
      url:e.target.value
    })
    
  }
  changeDescription=(e)=>{
    this.setState({
      description:e.target.value
    })
  }
  changeRating=(e)=>{
    this.setState({
      rating:e.target.value
    })
  }

  componentDidMount(){
    const bookmark =this.context.bookmarks.find(b=> b.id === parseInt(this.props.match.params.bookmarkId)) || {}
    this.setState({
      title:bookmark.title,
      url:bookmark.url,
      description:bookmark.description,
      rating:bookmark.rating
    });
  }

  render() {
    const { error, title, url, description, rating } = this.state
    
    return (
      <section className='EditBookmark'>
        <h2>Edit bookmark</h2>
        <form
          className='EditBookmark__form'
          onSubmit={e=>this.handleSubmit(e)}
        >
          <div className='EditBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              defaultValue = {title}
              onChange={this.changeTitle}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              defaultValue={url}
              onChange={this.changeUrl}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description 
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={this.changeDescription}
              
            />
            
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue={rating}
              onChange={this.changeRating}
              min='1'
              max='5'
              required
            />
          </div>
          <div className='EditBookmark__buttons'>
            <button type='button' onClick={this.onClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditBookmark;

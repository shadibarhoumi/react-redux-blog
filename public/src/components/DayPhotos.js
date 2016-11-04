import React, { Component } from 'react'
import moment from 'moment'
import Video from 'react-html5video'
import { Link } from 'react-router'

import 'react-html5video/dist/ReactHtml5Video.css'
import styles from './DayPhotos.css'

class DayPhotos extends Component {
  constructor(props) {
    super(props)
    this.state = { validUrl: true }
  }

  componentWillMount() {
    const { dateString } = this.props
    const validUrl = moment(dateString, 'MM-DD-YYYY').isValid()

    this.setState({ validUrl })

    if (validUrl) this.props.fetchImages(dateString)
    this.props.fetchTags()
  }

  renderImageList(images) {
    var imageList = <ol>
      {images.map(image => {
        if (image.media === 'photo') {
          return <li key={image._id}>
            <div>
              <img src={image.url_m} />
            </div>
            <div>
              {moment(image.dateTaken).format('dddd, MMMM Do YYYY, h:mma')}
            </div>
            <div>
              <b>{image.media}</b>
              {image.title}
            </div>
          </li>
        } else if (image.media === 'video') {
          return <li key={image._id}>
            <div>
              <Video
                controls autoPlay loop muted
                className={styles.video}
                width='500'
              >
                <source src={image.videoUrl} type='video/mp4' />
              </Video>
            </div>
            <div className={styles.blue}>
              {moment(image.dateTaken).format('dddd, MMMM Do YYYY, h:mma')}
            </div>
            <div>
              <b>{image.media}</b>
              {image.title}
            </div>
          </li>
        }
      })}
    </ol>

    return <div>
      {imageList}
      <h2>Raw Data</h2>
      <div><pre>{JSON.stringify(images, null, 2)}</pre></div>
    </div>
  }

  renderImages() {
    const { images, imagesLoading, imagesError } = this.props.imagesList

    if (imagesLoading) {
      return <div className="container"><h1>Images</h1><h3>Loading...</h3></div>
    } else if (imagesError) {
      return <div className="alert alert-danger">Error: {imagesError.message}</div>
    }

    return (
      <div className='container'>
        <h1 className={styles.blue}>Images for {moment(this.props.dateString, 'MM-DD-YYYY').format('dddd, MMMM Do YYYY')}</h1>
        {this.renderImageList(images)}
      </div>
    )
  }

  renderTags() {
    const { tags, tagsLoading, tagsError } = this.props.tagsList
    if (tagsLoading) {
      return <div className="container"><h3>Tags</h3><h3>Loading...</h3></div>
    } else if (tagsError) {
      return <div className="alert alert-danger">Error: {tagsError.message}</div>
    }

    return (
      <div className='container'>
        <ul>
          {tags.map(tag =>
            <li key={tag}>
              <Link to={'/tags/' + tag.substr(1)}>
                <p>{tag}</p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }

  render() {
    if (!this.state.validUrl) return <div className="alert alert-danger">Invalid Date!</div>
    return <div>
      {this.renderTags()}
      {this.renderImages()}
    </div>
  }
}


export default DayPhotos

import { connect } from 'react-redux'
import {
  fetchImages, fetchImagesSuccess, fetchImagesFailure,
  fetchTags, fetchTagsSuccess, fetchTagsFailure,
} from '../actions/images';

import DayPhotos from '../components/DayPhotos';


const mapStateToProps = (state) => {
  return {
    imagesList: state.images.imagesList,
    tagsList: state.images.tagsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImages: (dateString) => {
      dispatch(fetchImages(dateString))
      .then((response) => {
          !response.error ? dispatch(fetchImagesSuccess(response.payload)) : dispatch(fetchImagesFailure(response.payload));
        });
    },
    fetchTags: () => {
      dispatch(fetchTags())
      .then((response) => {
          !response.error ? dispatch(fetchTagsSuccess(response.payload)) : dispatch(fetchTagsFailure(response.payload));
        });
    }
  }
}


const DayPhotosContainer = connect(mapStateToProps, mapDispatchToProps)(DayPhotos)

export default DayPhotosContainer

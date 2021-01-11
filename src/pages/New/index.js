import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdArrowBack, IoMdImage } from 'react-icons/io';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './style.css';

import api from '../../services/api';

export default function New() {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  function handleImageInputChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return alert('Too big file!');
    }

    setImageFile(file);
  }

  useEffect(() => {
    if (!imageFile) return;

    const objectURL = URL.createObjectURL(imageFile);
    setImagePreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [imageFile]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!imageFile) {
      return alert('Please choose an image!');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('url', link);
    formData.append('description', description);
    formData.append('image', imageFile);

    api
      .post('newscards', formData)
      .then((response) => {
        alert('News card successfully created!');
        history.push('/');
      })
      .catch((error) => {
        alert('An unknown error has occurred!');
      });
  }

  return (
    <div className="container">
      <Header />

      <div className="bar">
        <div className="back-to-home" onClick={() => history.push('/')}>
          <IoMdArrowBack />
          GO BACK
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label
            className="image-label"
            htmlFor="image"
            style={{ backgroundImage: `url(${imagePreview})` }}
          >
            <p>
              <IoMdImage />
              Choose an image
            </p>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageInputChange}
            accept="image/jpeg, image/pjpeg, image/png"
          />

          <input
            required
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <input
            required
            type="text"
            placeholder="Author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <input
            required
            type="url"
            placeholder="Link"
            name="link"
            value={link}
            onChange={({ target }) => setLink(target.value)}
          />
          <textarea
            required
            placeholder="Description"
            name="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></textarea>

          <button type="submit" className="button">
            CREATE
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

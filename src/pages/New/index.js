import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdArrowBack, IoMdImage } from 'react-icons/io';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './style.css';

export default function New() {
  const history = useHistory();
  const [imageFile, setImageFile] = useState();
  const [imagePreview, setImagePreview] = useState();

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
            required
            type="file"
            name="image"
            id="image"
            onChange={handleImageInputChange}
            accept="image/jpeg, image/pjpeg, image/png"
          />

          <input required type="text" placeholder="Title" name="title" />
          <input required type="text" placeholder="Author" name="author" />
          <input required type="url" placeholder="Link" name="link" />
          <textarea
            required
            placeholder="Description"
            name="description"
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

import React from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit, onChange }) => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button className={css.SearchForm_button} type="submit">
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          onChange={onChange}
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

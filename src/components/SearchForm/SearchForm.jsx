import { useState} from 'react';
import css from "./SearchForm.module.css"

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SearchForm ({onSubmit}) {
    
    const[query, setQuery] = useState('');
    
     const handleChange = (e) => {
         setQuery(e.target.value.trim().toLowerCase()); 
    }
   const handleSubmit = (e) => {
        e.preventDefault();
        if (query === "") {
            return  toast.warn("Please enter search query");
        }
        onSubmit(query);
       setQuery('');
}

        return (
            <>
   <header className={css.SearchBar}>
   <form className={css.SearchForm} onSubmit={handleSubmit}>
   <button type="submit" className={css.SearchForm_button}>
    <span className={css.SearchForm_label}>Search</span>
    </button>

    <input
    className={css.SearchForm_input}
    type="text"
    name="search"
    value={query}
    onChange={handleChange}
    autocomplete="off"
    autofocus
    placeholder="Search images and photos"
    />
  </form>
</header>
                     
 </>
 )
}


SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
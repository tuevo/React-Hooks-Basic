import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './PostFilterForm.style.scss';

PostFilterForm.propTypes = {
  onSubmitPostFilterForm: PropTypes.func,
};

PostFilterForm.defaultProps = {
  onSubmitPostFilterForm: null
}

function PostFilterForm(props) {
  const { onSubmitPostFilterForm } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null); //Store an Object DOES NOT re-INITIAL every re-rendering

  function handleSearchTermChange(e) {
    const { value } = e.target;
    setSearchTerm(value);

    if (!onSubmitPostFilterForm) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = { searchTerm };
      onSubmitPostFilterForm(formValues);
    }, 300);
  }

  return (
    <form className="post-filter-form">
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search post..." />
    </form>
  );
}

export default PostFilterForm;
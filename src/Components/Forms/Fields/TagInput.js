import React, { useState } from 'react';

const TagInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const [state, setState] = useState({ items: [], focused: false, input: '' });

  const handleInputChange = (evt) => {
    setState({ input: evt.target.value });
  };

  const handleInputKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      // Enter
      const { value } = evt.target;

      setState({
        ...state,
        items: [...state.items, value],
        input: '',
      });
    }

    if (state.items.length && evt.keyCode === 8 && !state.input.length) {
      // backspace
      setState({
        ...state,
        items: state.items.slice(0, state.items.length - 1),
      });
    }
  };

  const handleRemoveItem = (index) => {
    return () => {
      setState({
        ...state,
        items: state.items.filter((_, i) => i !== index),
      });
    };
  };

  const styles = {
    container: {
      border: '1px solid #ddd',
      padding: '5px',
      borderRadius: '5px',
    },

    items: {
      display: 'inline-block',
      padding: '2px',
      border: '1px solid blue',
      fontFamily: 'Helvetica, sans-serif',
      borderRadius: '5px',
      marginRight: '5px',
      cursor: 'pointer',
    },

    input: {
      outline: 'none',
      border: 'none',
      fontSize: '14px',
      fontFamily: 'Helvetica, sans-serif',
    },
  };

  return (
    <label>
      <ul style={styles.container}>
        {state.items.map((item, i) => (
          <li key={i} style={styles.items} onClick={handleRemoveItem(i)}>
            {item}
            <span>(x)</span>
          </li>
        ))}
        <input
          style={styles.input}
          value={state.input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </ul>
    </label>
  );
};

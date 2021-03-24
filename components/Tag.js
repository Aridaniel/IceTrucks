import React, { useState } from 'react';
import styles from '../styles/Tag.module.css';

export default function Tag({ tagName, updateTagList }) {
  const [selected, setSelected] = useState(false);

  const handleSelect = (ev) => {
    const tagName = ev.target.innerHTML;
    setSelected(!selected);
    updateTagList(tagName);
    console.log('Clicked: ', tagName);
  };

  return (
    <div
      className={styles.tagBtn}
      style={selected ? { backgroundColor: '#9C9C9C' } : null}
      onClick={(ev) => handleSelect(ev)}
    >
      {tagName}
    </div>
  );
}

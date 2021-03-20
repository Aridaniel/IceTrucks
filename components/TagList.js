import React, { useState } from 'react'
import Tag from './Tag'
import styles from '../styles/TagList.module.css'

export default function TagList({tags, updateTagList}) {
  const [tagNames, setTagNames] = useState(tags);

  return (
    <div className={styles.container}>
      {tagNames.map((tag, index) => <Tag key={index} tagName={tag} updateTagList={updateTagList}/>)}
    </div>
  )
}

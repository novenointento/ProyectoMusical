import React from 'react';

const TaskTemplateCard = ({ title, description, items }) => {
  return (
    <article className="template-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
};

export default TaskTemplateCard;

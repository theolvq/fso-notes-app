import React from 'react';

const ShowButton = ({ showAll, toggleShowAll }) => {
  const btnLabel = showAll ? 'Show Important' : 'Show All';
  return <button onClick={toggleShowAll}>{btnLabel}</button>;
};

export default ShowButton;

import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const DeletedAdvertContext = createContext();

export const DeletedAdvertProvider = ({ children }) => {
  const [deletedAdvertId, setDeletedAdvertId] = useState(null);

  const markAdvertAsDeleted = (id) => {
    setDeletedAdvertId(id);
  };

  return (
    <DeletedAdvertContext.Provider value={{ deletedAdvertId, markAdvertAsDeleted }}>
      {children}
    </DeletedAdvertContext.Provider>
  );
};
DeletedAdvertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDeletedAdvert = () => useContext(DeletedAdvertContext);

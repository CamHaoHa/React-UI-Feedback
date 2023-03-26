import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  //fetch feedback when component did mount
  useEffect(() => {
    fetchFeedback();
  }, []);

  //fetch data
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();
    setFeedbackEdit(data);
    setIsLoading(false);
  };

  //add data
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([...feedback, data]);
  };

  //delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //update the feedback
  const updateFeedback = async (id, updFeedback) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updFeedback),
    });

    const data = await response.json();

    setFeedback(feedback.map((item) => (item.id === id ? data : item)));
    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  //set feedback ready to be updatea
  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
        addFeedback,
        deleteFeedback,
        updateFeedback,
        editFeedback,
        feedbackEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

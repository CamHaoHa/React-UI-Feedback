import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import { useState } from 'react';
import FeedbackData from './data/FeedbackData';
import FeedbackForm from './components/FeedbackForm';
import FeedbackStats from './components/FeedbackStats';

function App() {
  const [feedbacks, setFeedbacks] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    setFeedbacks([...feedbacks, newFeedback]);
  };

  return (
    <>
      <Header />
      <div className="container">
        <FeedbackForm handleAdd={addFeedback} />
        <FeedbackStats feedbacks={feedbacks} />
        <FeedbackList
          feedbacks={feedbacks}
          handleDelete={deleteFeedback}
        />
      </div>
    </>
  );
}

export default App;

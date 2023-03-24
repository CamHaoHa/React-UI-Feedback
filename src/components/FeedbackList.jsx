import FeedbackItem from './FeedbackItem';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

function FeedbackList({ feedbacks, handleDelete }) {
  if (!feedbacks && feedbacks.length === 0) {
    return <div>There are no feedback yet</div>;
  }
  return (
    <div className="feedback-list">
      <AnimatePresence>
        {feedbacks.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
          >
            <FeedbackItem
              key={item.id}
              item={item}
              handleDelete={handleDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

FeedbackList.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      rating: PropTypes.number,
      text: PropTypes.string,
    })
  ),
};
export default FeedbackList;

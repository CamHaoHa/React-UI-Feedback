import Card from './shared/Card';
import Button from './shared/Button';
import { useState } from 'react';
import RatingSelect from './RatingSelect';

function FeedbackForm({ handleAdd }) {
  const [inputText, setInputText] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(10);

  const handleChange = ({ target: { value } }) => {
    if (value === '') {
      setMessage(null);
      setBtnDisabled(true);
    } else if (value.trim().length < 10) {
      setMessage('Text must be at least 10 characters');
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setInputText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim().length > 10) {
      const newFeedback = {
        text: inputText,
        rating: rating,
      };
      handleAdd(newFeedback);
      setBtnDisabled(true);
      setRating(10);
      setInputText('');
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Would you like to rate our service?</h2>
        <RatingSelect
          select={setRating}
          selected={rating}
        />
        <div className="input-group">
          <input
            type="text"
            placeholder="write a review"
            value={inputText}
            onChange={handleChange}
          />

          <Button
            type="submit"
            isDisabled={btnDisabled}
          >
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;

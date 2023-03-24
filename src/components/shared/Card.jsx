import PropTypes from 'prop-types';

function Card({ children, reverse }) {
  const HeaderStyles = {
    backgroundColor: '#fff',
    color: '#000',
  };

  const reverseHeaderStyles = {
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: '#fff',
  };

  return (
    <div
      className="card"
      style={reverse ? reverseHeaderStyles : HeaderStyles}
    >
      {children}
    </div>
  );
}

Card.defaultProps = {
  reverse: false,
};
Card.propTypes = {
  children: PropTypes.node.isRequired,
  reserver: PropTypes.bool,
};
export default Card;

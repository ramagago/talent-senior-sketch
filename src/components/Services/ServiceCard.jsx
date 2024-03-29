import PropTypes from "prop-types";

const ServiceCard = ({ imgSource, title, description, onCardClick }) => {
  return (
    <div
      className="m-4 flex flex-col justify-center items-center bg-white w-60 xsm:w-72 h-96 py-10 px-10 text-center rounded-3xl transition ease-in-out hover:scale-105 hover:cursor-pointer"
      onClick={onCardClick}
    >
      <img src={imgSource} alt="icono del service card" className="h-28" />
      <h2 className="py-6 font-bold text-xl sm:text-2xl">{title}</h2>
      <p className="text-gray-500 text-lg sm:text-xl">{description}</p>
    </div>
  );
};

ServiceCard.propTypes = {
  imgSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onCardClick: PropTypes.func,
};

export default ServiceCard;

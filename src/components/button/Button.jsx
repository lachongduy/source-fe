import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
/**
 * @required
 * @param {string} type Type is 'button' | 'submit'
 * @returns
 */
const Button = ({
  type = "",
  onClick = () => {},
  children,
  className = "",
  ...props
}) => {
  const { to } = props;
  if (to !== "" && typeof to === "string") {
    return (
      <Link to={to}>
        <button
          type={type}
          {...props}
          onClick={onClick}
          className={`bg-blue-500 px-6 py-3 mx-auto text-white font-semibold rounded-lg text-center disabled:opacity-50 ${className}`}
        >
          {children}
        </button>
      </Link>
    );
  }
  return (
    <button
      type={type}
      {...props}
      onClick={onClick}
      className={`bg-blue-500 px-6 py-3 mx-auto text-white font-semibold rounded-lg text-center disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Button;

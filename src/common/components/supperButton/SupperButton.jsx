import s from "./supperButton.module.css";

const SuperButton = ({ red, className, ...restProps }) => {
  const finalClassName = `${s.default} ${red ? s.red : ""} `;

  return <button className={finalClassName} {...restProps} />;
};

export default SuperButton;

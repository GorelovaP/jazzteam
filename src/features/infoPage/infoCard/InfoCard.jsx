import "./infoCard.css";
import { HiLink } from "react-icons/hi";

export const InfoCard = ({ name, image, link }) => {
  return (
    <div className="infoCard__wrapper">
      <img src={image} alt="Sight" className="infoCard__wrapper__img" />
      <div className="infoCard__wrapper__name">{name}</div>
      <div className="infoCard__wrapper__linkArea">
        <div>
          <HiLink /> more information:
        </div>
        <a href={link} className="infoCard__wrapper__linkArea__link">
          {link}
        </a>
      </div>
    </div>
  );
};

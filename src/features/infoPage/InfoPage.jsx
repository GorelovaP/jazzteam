import {ThemeWrapper} from "../../common/components/themeWrapper/ThemeWrapper";
import {useSelector} from "react-redux";
import "./infoPage.css"
import {InfoCard} from "./infoCard/InfoCard";

export const InfoPage = () => {
    const information = useSelector(state => state.info.cards)

    return <ThemeWrapper>
        <div className="informationPageWrapper">
            <h2 className="informationPageWrapper__header">Places, where you definitely haven't been</h2>
            <div className="informationPageWrapper__cardArea">
                {information.map(el => <InfoCard key={el.id} name={el.name} image={el.image} link={el.link}/>)}
            </div>
        </div>
    </ThemeWrapper>
}
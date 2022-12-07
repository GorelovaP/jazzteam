import {createSlice} from "@reduxjs/toolkit";
import bagan from "../assets/information/img1.png"
import hitachi from "../assets/information/img5.png"
import angkor from "../assets/information/img.png"
import salar from "../assets/information/img4.png"
import zhangye from "../assets/information/img2.png"
import li from "../assets/information/img3.png"


const slice = createSlice({
    name: "info",
    initialState: {
        cards: [
            {
                name: "Bagan, Myanmar",
                image: bagan,
                link: "https://en.wikipedia.org/wiki/Bagan"
            },
            {
                name: "Hitachi National Seaside Park, Japan",
                image: hitachi,
                link: "https://en.wikipedia.org/wiki/Hitachi_Seaside_Park"
            },
            {
                name: "Angkor wat, Cambodia",
                image: angkor,
                link: "https://en.wikipedia.org/wiki/Angkor_Wat"
            },
            {
                name: "Salar de Yuni",
                image: salar,
                link: "https://en.m.wikipedia.org/wiki/Salar_de_Uyuni"
            },
            {
                name: "The colored rocks of Zhangye Danxia",
                image: zhangye,
                link: "https://en.wikipedia.org/wiki/Zhangye_National_Geopark"
            },
            {
                name: "Li River, China",
                image: li,
                link: "https://en.wikipedia.org/wiki/Bagan"
            },

        ]
    },
})
export const infoReducer = slice.reducer
export const {} = slice.actions


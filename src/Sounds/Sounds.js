import React from "react";
import _ from "lodash";
import Hideable from "../Hideable";
import SoundsItem from "./SoundsItem";
import "./sounds.css";

const cache = {};
const keys = {};

function importAll(r) {
    r.keys().forEach(key => {
        const start = key.indexOf("/");
        const end = key.lastIndexOf(".");
        const name = key.substring(start + 1, end);
        cache[name] = r(key);
        keys[name] = _.uniqueId();
    });
}

importAll(require.context("./audio/", true, /\.mp3$/));

const Sounds = () => (
    <Hideable
        label="Sounds"
        dir="bottom"
        align="flex-start"
        margin="0 0 2vmin 2vmax"
        childMargin="0 0 0 1vmin"
    >
        {Object.keys(cache).map(sound => (
            <SoundsItem key={keys[sound]} name={sound} src={cache[sound]} />
        ))}
    </Hideable>
);

export default Sounds;

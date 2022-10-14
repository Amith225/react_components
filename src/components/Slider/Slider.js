import './Slider.css';
import {useEffect, useState} from "react";

export default function Slider({imgs, auto = 5000}) {
    const [curr, setCurr] = useState(0);
    const [intervalId, setIntervalId] = useState(-1);

    function inc(val, byAuto = false) {
        setCurr(curr => {
            curr += val;
            curr %= imgs.length;
            if (curr < 0) curr = imgs.length + curr;
            return curr;
        });
        if (!byAuto) {
            clearInterval(intervalId);
            setIntervalId(setInterval(() => inc(1, true), auto));
        }
    }

    useEffect(() => {
        if (auto) {
            let intId = setInterval(() => inc(1, true), auto);
            setIntervalId(intId);
            return () => clearInterval(intId);
        }
    }, []);

    return (
        <div className="Slider--cnt">
            <div className="Slider">
                {imgs.map(img =>
                    <img key={img} alt={imgs.indexOf(img)} src={img} className="Img"
                         active={img === imgs[curr] ? 1 : 0}/>
                )}
            </div>
            <span className={"left"} onClick={() => inc(-1)}>{"<"}</span>
            <span className={"right"} onClick={() => inc(1)}>{">"}</span>
        </div>
    );
}

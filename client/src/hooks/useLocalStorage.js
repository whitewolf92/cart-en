import { useState, useEffect } from "react";

const useLocalStorage = (keyname, defaultValue) => {
    const [data, setStateData] = useState();

    const setData = value => {
        localStorage.setItem(keyname, JSON.stringify(value));
        setStateData(value);
    };

    useEffect(() => {
        let tmpData =
            localStorage.getItem(keyname) === undefined ||
            !localStorage.getItem(keyname)
                ? null
                : JSON.parse(localStorage.getItem(keyname));

        if (tmpData === null && defaultValue) {
            tmpData = defaultValue;
            localStorage.setItem(keyname, JSON.stringify(defaultValue));
        }
        setStateData(tmpData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyname]);

    return { data, setData };
};

export default useLocalStorage;

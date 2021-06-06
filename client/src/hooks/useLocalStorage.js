import { useState, useEffect } from 'react';

const useLocalStorage = (keyname, defaultValue) => {
    const [data, setStateData] = useState();

    const setData = (value) => {
        localStorage.setItem(keyname, JSON.stringify(value));
        setStateData(JSON.parse(JSON.stringify(value)));
        console.log('local data set');
    };

    useEffect(() => {
        let tmpData = JSON.parse(localStorage.getItem(keyname));
        if (tmpData === null && defaultValue) {
            tmpData = defaultValue;
            localStorage.setItem(keyname, JSON.stringify(defaultValue));
        }
        setStateData(tmpData);
    }, [keyname]);

    return { data, setData };
};

export default useLocalStorage;

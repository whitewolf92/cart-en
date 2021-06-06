import { useState, useEffect } from 'react';

const useFetch = (url, processor) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await fetch(`${url}`);
        const responseJson = await response.json();
        if (response.status === 200) {
            if (processor) {
                let processed = processor(responseJson);
                setData(processed);
            } else {
                setData(responseJson);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return { loading, data };
};

export default useFetch;

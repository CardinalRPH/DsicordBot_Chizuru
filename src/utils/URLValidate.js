import { URL } from "url";

const stringIsAValidUrl = (s, pattern) => {
    try {
        new URL(s);
        return pattern.test(s);
    } catch (err) {
        return false;
    }
};

export default stringIsAValidUrl;
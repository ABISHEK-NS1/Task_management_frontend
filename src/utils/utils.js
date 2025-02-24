function utils(path) {
    return new URL(`/src/assets/${path}`,import.meta.url).href;
}

export default utils;
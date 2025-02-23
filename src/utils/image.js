const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/JPG",
    "image/jpeg",
    "image/JPEG",
    "image/png",
    "image/PNG",
];

const validateImageType = (value) => {
    if (value) {
        return SUPPORTED_FORMATS.includes(value.mimetype);
    }
};

// module.exports = { SUPPORTED_FORMATS, validateImageType };
export { SUPPORTED_FORMATS, validateImageType };
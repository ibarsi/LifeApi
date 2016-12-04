/* ==================================================
   PROMISE HELPER
================================================== */

const delay = (milliseconds, value) => {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds, value);
    });
};

export default {
    delay
};

export {
    delay
};

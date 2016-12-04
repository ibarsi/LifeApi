const promise_helper = {
    delay(milliseconds, value) {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds, value);
        });
    }
};

export default promise_helper;

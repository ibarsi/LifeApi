/* ==================================================
   REQUEST HELPER
================================================== */

import superagent from 'superagent';
import superagent_promise from 'superagent-promise';

const request = superagent_promise(superagent, Promise);

export default request;

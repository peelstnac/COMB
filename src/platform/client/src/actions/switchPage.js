const PAGE = require('../constants/page');

const switchPage = (page) => {
    return({
        type: PAGE,
        page: page
    });
}

export default switchPage;
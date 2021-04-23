'use strict';

module.exports = {
  pageQuery: {
    currentPage: { type: 'integer', min: 1, description: '单页数量' },
    pageSize: { type: 'integer', min: 1, description: '分页' },
  },
};

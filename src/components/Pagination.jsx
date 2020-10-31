import React from 'react';
import {Pagination as PaginationEl } from 'antd';
import PropTypes from 'prop-types';

const Pagination = ({pages,currentPage,nextPage,value,loading}) => {
    return <>
    { value === '' || loading ? null :  <PaginationEl defaultCurrent={currentPage} total={pages}  onChange={ nextPage}/>}
    </>
}

Pagination.propTypes  = {
    pages : PropTypes.number,
    currentPage: PropTypes.number,
    nextPage: PropTypes.number,
    value: PropTypes.string,
    loading: PropTypes.bool
}
export default Pagination;
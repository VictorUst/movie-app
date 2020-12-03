import React from 'react';
import {Pagination as PaginationEl } from 'antd';
import PropTypes from 'prop-types';

const Pagination = ({pages,currentPage,nextPage,value,loading}) => {
    return <>
    { value === '' || loading ? null :  <PaginationEl defaultCurrent={currentPage} total={pages}  onChange={ nextPage}/>}
    </>
}

Pagination.propTypes  = {
    pages : PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    nextPage: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
}
export default Pagination;
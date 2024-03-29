import React, { useState } from 'react';
import RenderTop10NewArticles from './Top10NewArticles';

const ScrollableComponent = ({
    disabledPrev = false,
    disabledNext = false,
    onChangePagination = (type = "next") => {}, 
}) => {

  return (
        <div className="join grid grid-cols-2">
            <button className="join-item btn btn-outline" disabled={disabledPrev} onClick={() => onChangePagination("prev")}>
                Previous page
            </button>
            <button className="join-item btn btn-outline" disabled={disabledNext} onClick={() => onChangePagination("next")}>
                Next Page
            </button>
        </div>
  );
};

export default ScrollableComponent;

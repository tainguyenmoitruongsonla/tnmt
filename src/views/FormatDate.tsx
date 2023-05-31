import React, { useState } from 'react';

const FormatDate = ({ time }:any) => {

  function FormatDate(time:any){
    if(time != null){
      const date = new Date(time);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return '';
  }

  return (
    <>{FormatDate(time)}</>
  );
};

export default FormatDate;

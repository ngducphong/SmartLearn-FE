import React from 'react';

const DateCommponent = ({inputDate}) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    return (
        <div>
            ngày {day} tháng {month} năm {year}
        </div>
    );


}
export default DateCommponent;
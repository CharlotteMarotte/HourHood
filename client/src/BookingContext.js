import React from 'react';

/**
 * The context should be in its own file. Any component that 
 * wants to access the context must import it.
 **/

const BookingContext = React.createContext();

export default BookingContext;
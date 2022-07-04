// useState is one of the "hooks" of React
// "hooks" can be used ONLY in function components (class components do not need them and are not allowed to use them)
import React, { useState, useEffect } from 'react';
import { getWorkshops } from '../../../services/workshops';

// Shortcut to create function component code - sfc
// { details } -> pick props.details (1st argument is props) and set it to a variable called details
const WorkshopsList = ( { details } ) => {
    console.log( details );
    
    // [ data, setter function for the data ]
    // workshops -> data (1st item in the array)
    const [ workshops, setWorkshops ] = useState( [] );
    // console.log( 'workshops = ', workshops ); // data -> []
    // console.log( 'setWorkshops = ', setWorkshops ); // setter -> function

    // if we pass empty array (i.e. []) as the 2nd argument to useEffect, the "side-effect" runs after firts component render
    useEffect(
        () => { // the "side-effect"
            const workshops = getWorkshops();
            setWorkshops( workshops );
        },
        []
    );

    // <></> -> is React.Fragment
    return (
        <>
            {
                workshops.length === 0 && (
                    <div>Loading..</div>
                )
            }
            {
                workshops.length !== 0 && (
                    <>
                        <h1>List of workshops</h1>
                        <hr />
                        <ol>
                        {/* Use array idx (second argument to function passed to map() as last resort */}
                        {
                            workshops.map(
                                workshop => (
                                    <li key={workshop.id}>{workshop.name}</li>
                                )
                            )
                        }
                        </ol>
                    </>
                )
            }
        </>
    );
}
 
export default WorkshopsList;
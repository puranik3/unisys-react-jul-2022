import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getWorkshopById } from '../../../services/workshops';

const WorkshopDetails = () => {
    const { id } = useParams(); // { id: '2', action: 'edit' }

    const [ workshop, setWorkshop ] = useState( null );
    const [ error, setError ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    useEffect(() => {
        const fetchWorkshop = async () => {
            try {
                const workshop = await getWorkshopById( id );
                setWorkshop(workshop);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchWorkshop();
    }, []); // runs ONLY after initial render


    return (
        <div>
            {
                loading && (
                    <div>Need to fetch details for workshops with id = {id}</div>
                )
            }
            {
                !loading && error && (
                    <div>{error.message}</div>
                )
            }
            {
                !loading && !error && workshop && (
                    <div>{workshop.name}</div>
                )
            }
        </div>
    );
}
 
export default WorkshopDetails;
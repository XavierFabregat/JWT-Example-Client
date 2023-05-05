import React from 'react'
import { useByeQuery } from '../../graphql/hooks';



export const Bye: React.FC = () => {

    const { data, error, loading } = useByeQuery({
        fetchPolicy: 'network-only'
    });

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log(error)
        return <div>error...</div>
    }

    if (!data) {
        return <div>no data...</div>
    }

    return (
        <div>
            <div>Bye : </div>
            <div>{data.bye}</div>
        </div>
    )
}
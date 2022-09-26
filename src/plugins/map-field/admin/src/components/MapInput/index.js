import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';

export const MapInput = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [inputValue, setinputValue] = useState('');
    const [stops, setStops] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchParadas = useCallback(() => {
        setLoading(true);
        fetch(`https://securesite.voyenbus.com/TOLWeb/services/localizedParadas.seam?tipo=json&formato=short&agente=tol&locale=es&max=10&busqueda=${inputValue}`)
            .then(res => res.json())
            .then((res) => {
                setStops([ ...res.paradas.parada ]);
                setLoading(false);
            });
    }, [inputValue]);

    const handleInputChange = ({ target }) => {
        setinputValue(target.value);
        fetchParadas();
    };

    const handleChange = (value) => {
        setSearchValue(value);
        props.onChange({ target: { name: props.name, value } });
    }

    useEffect(() => {
        console.log("searc h ",searchValue);
    }, [searchValue]);

    useEffect(() => {
        console.log(props);
    }, [props]);

    return (
        <Combobox placeholder={'Ingrese un prueba'} loading={loading} label="Origen" error={props.error} value={searchValue} onChange={handleChange} onInputChange={handleInputChange}>
            {
                stops.map((stop) => (
                    <ComboboxOption key={stop.codigo} value={stop.codigo}>{stop.nombre}</ComboboxOption>
                ))
            }
        </Combobox>
    )
}

export default MapInput;
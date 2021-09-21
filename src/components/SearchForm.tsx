import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SearchForm() {
    const [input, setInput] = useState('');
    const history = useHistory();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        history.push(`/postcode/${input}/`);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>Search for a post code:&nbsp;
                <input type="text" name="postcode" onChange={e => setInput(e.target.value)} />
            </label>
        </form>
    );
}
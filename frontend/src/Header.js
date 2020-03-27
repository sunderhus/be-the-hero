import React from 'react';


/**
 * o ng content do angular é o props.children do react ou { children} via desestruturaçao
 * usamos ou props.nomeDaProp
 *  ou desestruturando o objeto de props em  {nomeDaProp1, nomeDaProp2, etc..}
 */
export default function Header({ children }) {
    return (
        <header>
            <h1>{children}</h1>
        </header>
    );
}
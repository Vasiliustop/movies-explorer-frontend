import React from 'react';

export default function Portfolio() {

    return(
        <div className="portfolio">
        <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__list'>
                <li className='portfolio__list-item'>
                    <a className='portfolio__list-link' href='https://github.com/Vasiliustop/how-to-learn' rel="noreferrer" target="_blank">Статичный сайт </a>
                    <a className='portfolio__list-link' href='https://github.com/Vasiliustop/how-to-learn' rel="noreferrer" target="_blank">↗</a>
                </li>
                <li className='portfolio__list-item'>
                    <a className='portfolio__list-link' href='https://vasiliustop.github.io/russian-travel/' rel="noreferrer" target="_blank">Адаптивный сайт</a>
                    <a className='portfolio__list-link' href='https://vasiliustop.github.io/russian-travel/' rel="noreferrer" target="_blank">↗</a>
                </li>
                <li className='portfolio__list-item'>
                    <a className='portfolio__list-link' href='https://vasiliusmesto.students.nomoredomains.xyz/signin' rel="noreferrer" target="_blank">Одностраничное приложение</a>
                    <a className='portfolio__list-link' href='https://vasiliusmesto.students.nomoredomains.xyz/signin' rel="noreferrer" target="_blank">↗</a>
                </li>
                
            </ul>
    </div>
    )
}
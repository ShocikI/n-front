'use client';
import { FC, useState } from 'react';
import { Event } from '../data/Event';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

type Props = { event: Event; key: number };

export const EventComponent: FC<Props> = props => {
  const [isHide, setIsHide] = useState<boolean>(true);
  const handleHiddingDetails = () => setIsHide(!isHide);
  const angleIcon = isHide ? faAngleDown : faAngleUp;

  return (
    <li className="flex flex-col box-border m-2 p-1 w-full border-2 border-primary" key={props.event.title}>
      <div className="flex flex-row place-content-between px-1.5">
        <h1 className="font-bold">{props.event.title}</h1>
        <button className="text-xs" onClick={handleHiddingDetails}>
          {clsx(isHide && 'Poznaj', !isHide && 'Ukryj', ' szczegóły')}
          <FontAwesomeIcon icon={angleIcon} className="pl-1" />
        </button>
      </div>
      <div className={clsx('grid justify-items-start pl-1.5', !isHide && 'block', isHide && 'hidden')}>
        <h2>{props.event.date.toDateString()}</h2>
        <h2>Kategoria: {props.event.category.name}</h2>
        <h2>{props.event.description}</h2>
        <h2>Cena: {props.event.price} zł</h2>
        <h2>Dostępne miejsca: {props.event.avaliable_places}</h2>
      </div>
    </li>
  );
};

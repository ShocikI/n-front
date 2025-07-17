`use client`;

import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

import { Event } from "@/utils/interfaces"
import { ImageComponent } from "@/components/layout/components/ImageComponent";
import { PriceComponent } from "@/components/layout/components/PriceComponent";
import { AvaliablePlaceComponent } from "@/components/layout/components/AvaliablePlacesComponent";

dayjs.locale('pl');

type Props = { 
  event?: Event,
  isOwner?: boolean
};

export const UnmutableEventSection = ({ event, isOwner }: Props) => {
  const router = useRouter();

  const moveToUserProfile = async () => {
      router.push(`/users/${event?.owner.username}/`);
    }

  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <main className="flex flex-col">
      <section className="flex flex-row gap-4">
        <ImageComponent event={event} />
        <section className="flex flex-col w-fit gap-2">
          <Label className="font-bold">{event?.title}</Label>
          <button 
            onClick={moveToUserProfile}
            className="flex place-start underline hover:no-underline hover:text-white"
            >Owner: {event?.owner.username}</button>
          <Label>{dayjs(event?.date).format('LLL')}</Label>
          <Label>{event?.address}</Label>
          { !isOwner && <AvaliablePlaceComponent event={event}/> }
          { !isOwner && <PriceComponent event={event}/> }
        </section>
      </section>
      <p className="pt-4">{!isOwner && event?.description}</p>
    </main>
  )
}
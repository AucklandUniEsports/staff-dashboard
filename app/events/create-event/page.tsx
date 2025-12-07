import prisma from '@/lib/prisma'
import BackNav from '@/app/components/BackNav';
import StandardButton from "@/app/components/StandardButton";

export default async function CreateEvent() {
  return (
      <>
        <section className="content-block">
            <BackNav/>
            <input className="input-field" type="text" placeholder="Rage Art Rumble 2025: Round 2"/>
            <input className="input-field" type="text" placeholder="Really dope Tekken 8/Brawllhalla Tournament."/>
            <input className="input-field" type="text" placeholder="start.gg/RAR252"/>
            <StandardButton title="Create Event." type="submit" color="grey" isLink={false}/>
        </section>
      </>
  );
}

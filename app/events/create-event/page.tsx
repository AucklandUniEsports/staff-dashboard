'use client';

import { useState } from 'react';
import prisma from '@/lib/prisma'
import BackNav from '@/app/components/BackNav';
import StandardButton from "@/app/components/StandardButton";

export default function CreateEvent() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
      <>
        <section className="content-block">
            <BackNav/>

            <input 
              accept="image/*" 
              hidden 
              id='thumbnail-upload' 
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setPreview(url);
              }}></input>
            {preview && (
              <img
                alt="Preview of uploaded thumbnail."
                className='uploaded-image-preview'
                src={preview}
              />
            )}            
            <label className='upload-image' htmlFor='thumbnail-upload' id='thumbnail-upload-proxy'>Upload a Thumbnail.</label>
            <label className="input-label" htmlFor="">Event Name</label>
            <input className="input-field" type="text" placeholder="Rage Art Rumble 2025: Round 2"/>
            <label className="input-label" htmlFor="">Event Description</label>
            <input className="input-field" type="text" placeholder="Really dope Tekken 8/Brawllhalla Tournament."/>
            <label className="input-label" htmlFor="">Signup Page</label>
            <input className="input-field" type="text" placeholder="start.gg/RAR252"/>
            <StandardButton title="Create Event." type="submit" color="grey"/>
        </section>
      </>
  );
}

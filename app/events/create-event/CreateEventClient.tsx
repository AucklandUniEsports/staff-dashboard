'use client';

import { useState } from 'react';
import BackNav from '@/app/components/BackNav';
import StandardButton from "@/app/components/StandardButton";
import CategoryTag from '@/app/components/CategoryTag';
import createEvent from '@/app/actions/createEvent';

interface Location {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface CreateEventClientProps{
  locations: Location[];
  categories: Category[];
}

export default function CreateEventClient({locations, categories} : CreateEventClientProps) {
  const [preview, setPreview] = useState<string | null>(null);
  return (
        <section className="content-block">
            <BackNav/>
            <form action={createEvent}>
              <input
                accept="image/*"
                hidden
                id='thumbnail-upload'
                name='thumbnail'
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
                  className='thumbnail'
                  src={preview}
                />
              )}
              <label className='upload-image' htmlFor='thumbnail-upload' id='thumbnail-upload-proxy'>Upload a Thumbnail.</label>
              <label className="input-label">Event Name</label>
              <input className="input-field" name="name" type="text" placeholder="Rage Art Rumble 2025 Round 2"/>
              <label className="input-label">Date & Time</label>
              <input
                className='input-time'
                type="datetime-local"
                id="meeting-time"
                name="date-time"
              />
              <label className="input-label">Location</label>
              <ul className='category-wrapper'>
                {
                    locations.map((location, index) =>
                        <li key={index}>
                          <input name='location' className='selectable-input' hidden id={location.name} required type="radio" value={location.id}/>
                          <CategoryTag name={location.name} htmlFor={location.name}/>
                        </li>
                    )
                }
              </ul>
              <label className="input-label">Categories</label>
              <ul className='category-wrapper'>
                {
                    categories.map((category, index) =>
                        <li key={index}>
                          <input name='categories' className='selectable-input' hidden id={category.name} type="checkbox" value={category.id}/>
                          <CategoryTag name={category.name} htmlFor={category.name}/>
                        </li>
                    )
                }
              </ul>
              <label className="input-label">Event Description</label>
              <input name='description' className="input-field" type="text" placeholder="Really dope Tekken 8/Brawllhalla Tournament."/>
              <label className="input-label">Signup Link</label>
              <input name='link' className="input-field" type="text" placeholder="start.gg/RAR252"/>
              <StandardButton title="Create Event." type="submit" color="grey"/>
            </form>
        </section>
  );
}

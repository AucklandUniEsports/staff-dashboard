'use client';

import { useState } from 'react';
import prisma from '@/lib/prisma';
import BackNav from '@/app/components/BackNav';
import { useRouter } from "next/navigation";
import StandardButton from "@/app/components/StandardButton";
import CategoryTag from '@/app/components/CategoryTag';

interface CreateEventClientProps{
  locations: Record<string, any>[];
  categories: Record<string, any>[];
}

export default function CreateEventClient({locations, categories} : CreateEventClientProps) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  return (
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
            <label className="input-label">Event Name</label>
            <input className="input-field" type="text" placeholder="Rage Art Rumble 2025: Round 2"/>
            <label className="input-label">Date & Time</label>
            <input
            className='input-time'
            type="datetime-local"
            id="meeting-time"
            name="date-time"/>
            <label className="input-label">Location</label>
            <ul className='category-wrapper'>
              {
                  locations.map((location, index) =>
                      <CategoryTag name={location.name} key={index}/>
                  )
              }
            </ul>
            <label className="input-label">Categories</label>
            <ul className='category-wrapper'>
              {
                  categories.map((categories, index) =>
                      <CategoryTag name={categories.name} key={index}/>
                  )
              }
            </ul>
            <label className="input-label">Event Description</label>
            <input className="input-field" type="text" placeholder="Really dope Tekken 8/Brawllhalla Tournament."/>
            <label className="input-label">Signup Page</label>
            <input className="input-field" type="text" placeholder="start.gg/RAR252"/>
            <StandardButton title="Create Event." type="submit" color="grey"/>
        </section>
  );
}

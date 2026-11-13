'use client'

import { useState } from 'react'
import type { ImageField } from '@/types'

interface Props {
  images: ImageField[]
  alt: string
}

export default function PhotoGallery({ images, alt }: Props) {
  const [index, setIndex] = useState<number>(0)
  const current = images[index]

  if (!current) {
    return (
      <div className="flex h-96 items-center justify-center rounded-3xl bg-coral-100 text-8xl">🐾</div>
    )
  }

  return (
    <div>
      <img
        src={`${current.imgix_url}?w=1400&h=1100&fit=crop&auto=format,compress`}
        alt={`${alt} photo ${index + 1}`}
        width={700}
        height={550}
        className="h-80 w-full rounded-3xl object-cover shadow-soft sm:h-[30rem]"
      />
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((img, i) => (
            <button
              key={`${img.imgix_url}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`overflow-hidden rounded-2xl border-4 transition ${
                i === index ? 'border-coral-500' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                alt=""
                width={150}
                height={150}
                className="h-20 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
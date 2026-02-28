import { useState } from 'react'
import { Icon } from '../primitives/Icon'

export interface MediaSlide {
  id: string
  title: string
  subtitle?: string
  toneStart: string
  toneEnd: string
}

export interface MediaGalleryProps {
  slides: MediaSlide[]
}

export function MediaGallery({ slides }: MediaGalleryProps) {
  const [index, setIndex] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)

  const active = slides[index]

  const prev = () => setIndex((value) => (value === 0 ? slides.length - 1 : value - 1))
  const next = () => setIndex((value) => (value === slides.length - 1 ? 0 : value + 1))

  return (
    <div className="ds-media-gallery">
      <div className="ds-media-gallery__main" style={{ background: `linear-gradient(135deg, ${active.toneStart}, ${active.toneEnd})` }}>
        <button className="ds-media-gallery__nav ds-media-gallery__nav--prev" onClick={prev} type="button" aria-label="Предыдущий кадр">
          <Icon name="chevron-left" size={14} />
        </button>

        <button className="ds-media-gallery__zoom" onClick={() => setZoomOpen(true)} type="button">
          <span className="ds-media-gallery__title">{active.title}</span>
          {active.subtitle ? <span className="ds-media-gallery__subtitle">{active.subtitle}</span> : null}
        </button>

        <button className="ds-media-gallery__nav ds-media-gallery__nav--next" onClick={next} type="button" aria-label="Следующий кадр">
          <Icon name="chevron-right" size={14} />
        </button>
      </div>

      <div className="ds-media-gallery__thumbs" role="tablist">
        {slides.map((slide, slideIndex) => (
          <button
            className={`ds-media-gallery__thumb ${slideIndex === index ? 'ds-media-gallery__thumb--active' : ''}`}
            key={slide.id}
            onClick={() => setIndex(slideIndex)}
            role="tab"
            type="button"
          >
            <span className="ds-media-gallery__thumb-swatch" style={{ background: `linear-gradient(135deg, ${slide.toneStart}, ${slide.toneEnd})` }} />
            <span className="ds-media-gallery__thumb-label">{slide.title}</span>
          </button>
        ))}
      </div>

      {zoomOpen ? (
        <div className="ds-media-gallery__lightbox" onClick={() => setZoomOpen(false)} role="presentation">
          <div className="ds-media-gallery__lightbox-card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <div className="ds-media-gallery__lightbox-image" style={{ background: `linear-gradient(135deg, ${active.toneStart}, ${active.toneEnd})` }}>
              <p className="ds-media-gallery__lightbox-title">{active.title}</p>
            </div>
            <button className="ds-media-gallery__lightbox-close" onClick={() => setZoomOpen(false)} type="button">
              Закрыть
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

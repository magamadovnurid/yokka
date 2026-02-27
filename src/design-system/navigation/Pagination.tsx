interface PaginationProps {
  currentPage: number
  totalPages: number
  onChange?: (page: number) => void
}

export function Pagination({ currentPage, onChange, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className="ds-pagination" aria-label="Пагинация">
      <button className="ds-pagination__item" disabled={currentPage === 1} onClick={() => onChange?.(currentPage - 1)} type="button">
        ‹
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`ds-pagination__item ${page === currentPage ? 'ds-pagination__item--active' : ''}`}
          onClick={() => onChange?.(page)}
          type="button"
        >
          {page}
        </button>
      ))}
      <button
        className="ds-pagination__item"
        disabled={currentPage === totalPages}
        onClick={() => onChange?.(currentPage + 1)}
        type="button"
      >
        ›
      </button>
    </nav>
  )
}

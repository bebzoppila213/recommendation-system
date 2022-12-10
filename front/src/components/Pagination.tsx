
type PaginationProps = {
    onPaginationNext: () => void,
    onPaginationBack: () => void,
    activePagination: number | string
}

export default function Pagination({onPaginationNext, onPaginationBack, activePagination}: PaginationProps){


    return(
    <div className="pagination2">
              <button
                onClick={() => onPaginationBack()}
                className="pagination2-next"
              >
                Назад
              </button>
                <strong className="active">{activePagination}</strong>
              <button
                onClick={() => onPaginationNext()}
                className="pagination2-next"
              >
                Далее
              </button>
    </div>
    )
}
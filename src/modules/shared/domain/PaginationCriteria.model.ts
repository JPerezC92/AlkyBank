export interface IPaginationCriteria {
	page: number;
	limit: number;
}

export class PaginationCriteria implements IPaginationCriteria {
	page: number;
	limit: number;

	constructor(page: number, limit: number) {
		this.page = page;
		this.limit = limit;
	}

	static default(): PaginationCriteria {
		return new PaginationCriteria(1, 10);
	}

	changePage(page: number): PaginationCriteria {
		return new PaginationCriteria(page, this.limit);
	}

	changeLimit(limit: number): PaginationCriteria {
		return new PaginationCriteria(1, limit);
	}

	resetPage(): PaginationCriteria {
		return new PaginationCriteria(1, this.limit);
	}
}

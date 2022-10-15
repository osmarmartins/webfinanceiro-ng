import { LazyLoadEvent } from 'primeng/api';

export class Paginacao {
    page = 0;
    size = 5;
    sort = '';

    getQueryParams() {
        const url = Object.keys(this).reduce((acc, x) => {
            return (acc += this[x] !== null ? `${encodeURIComponent(x)}=${encodeURIComponent(this[x])}&` : '');
        }, '?');
        return url;
    }

    onLazyLoad(event: LazyLoadEvent = null): void {
        if (event?.sortField) {
            const ordem = event?.sortOrder > 0 ? ',asc' : ',desc';
            this.sort = `${event?.sortField}${ordem}`;
        }
        this.size = event?.rows;
        this.page = Math.ceil(event?.first / event?.rows);
    }
}

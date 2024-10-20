import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = $localize`:@@paginatorItemsPerPage:Items por página:`;
  override nextPageLabel = $localize`:@@paginatorNextPage:Siguiente página`;
  override previousPageLabel = $localize`:@@paginatorPreviousPage:Página anterior`;
}
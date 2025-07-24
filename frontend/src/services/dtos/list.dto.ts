export type ListDto<CONTENT> = {
  content: CONTENT,
  // pageable: {
  //   pageNumber: number,
  //   pageSize: number,
  //   sort: {
  //     unsorted: boolean,
  //     sorted: boolean,
  //     empty: boolean
  //   },
  //   offset: number,
  //   unpaged: boolean,
  //   paged: boolean
  // },
  totalPages: number,
  totalElements: number,
  // last: boolean,
  // numberOfElements: number,
  size: number,
  number: number,
  // sort: {
  //   unsorted: boolean,
  //   sorted: boolean,
  //   empty: boolean
  // },
  // first: boolean,
  // empty: boolean
}

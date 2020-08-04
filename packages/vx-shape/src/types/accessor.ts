export type Accessor<Datum, Output> = (d: Datum) => Output;

export type AccessorWithIndex<Datum, Output> = (d: Datum, index: number) => Output;

export type AccessorForArrayItem<Datum, Output> = (
  d: Datum,
  index: number,
  data: Datum[],
) => Output;

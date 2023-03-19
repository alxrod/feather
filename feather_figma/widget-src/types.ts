export type ComponentSelection ={
  id: string,
  name: string
}

export const widgetTypes = {
  HUB: 0,
  ITEM: 1,
}
export type UserNub = {
  id: string,
  username: string,
  hasPhoto?: boolean,
  photoUrl?: string,
}

export type DeadlineNub = {
  id: string,
  payout: number,
  date: string,
  name?: string,
  items: ItemNub[],
}

export type ItemNub = {
  id: string,
  body: string,
  name: string,
}

export type ContractNub = {
  id?: string;
  worker?: UserNub,
  buyer?: UserNub,
  deadlines: DeadlineNub[],
  items: ItemNub[],
  price: number,
  title: string,
  summary: string,
};

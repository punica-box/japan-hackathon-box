export interface JobData {
  company: string;
  type: string;
  start: string;
  end: string;
}

export interface HumanData {
  address: string;
  name: string;
  age?: number;
  gender?: number;
  company: string;
  history?: JobData[];
  mail?: string;
  memo?: string;
}

interface HumanDatas {
  datas: HumanData[];
}

export interface ResultAuction {
  human: HumanData;
  price: number;
}

export interface Ibid {
  personAddr: string;
  companyAddr: string;
  price: number;
  now: string;
}

export interface IlistBidProps {
  listBid: Ibid[];
}

export interface Company {
  companyAddr: string;
  name: string;
}

export const makeJobDataMock = (payload: { [key in keyof JobData]?: JobData[key] } = {}): JobData => {
  return Object.assign(
    {},
    {
      company: "this is mock string",
      type: "this is mock string",
      start: "this is mock string",
      end: "this is mock string"
    },
    payload
  );
};

export const makeHumanDataMock = (payload: { [key in keyof HumanData]?: HumanData[key] } = {}): HumanData => {
  return Object.assign(
    {},
    {
      address: "something",
      name: "this is mock string",
      age: 1,
      gender: 1,
      company: "this is mock string",
      history: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeJobDataMock())),
      mail: "this is mock string",
      memo: "this is mock string"
    },
    payload
  );
};

export const makeIbidMock = (payload: { [key in keyof Ibid]?: Ibid[key] } = {}): Ibid => {
  return Object.assign(
    {},
    {
      personAddr: "",
      companyAddr: "",
      price: 1,
      now: ""
    },
    payload
  );
};

export const makeIlistBidPropsMock = (
  payload: { [key in keyof IlistBidProps]?: IlistBidProps[key] } = {}
): IlistBidProps => {
  return Object.assign(
    {},
    {
      listBid: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeIbidMock()))
    },
    payload
  );
};

export const makeHumanDatasMock = (payload: { [key in keyof HumanDatas]?: HumanDatas[key] } = {}): HumanDatas => {
  return Object.assign(
    {},
    {
      datas: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeHumanDataMock()))
    },
    payload
  );
};

  export interface IApiResponseObservation {
    Id: number;
    Name: string;
    Datas: IObservationData[];
  }

  export interface IObservationData {
    SamplingTime: string;
    Properties: IProperty[];
  }

  export interface IProperty {
    Value: string | number | boolean;
    Label: string;
  }

export interface IConvertObservationData {
  samplingTime: string;
  projectName: string;
  constructionCount: number;
  isCompleted: boolean;
  lengthOfRoad: number;
}

export interface IApiResponseAddObservation {
  payload:boolean;
}

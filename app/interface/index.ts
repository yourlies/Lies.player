export interface Audio {
  src: string;
  volume: number;
  addEventListener: Function,
  readonly currentTime: number,
  readonly duration: number,
  readonly buffered: any;
  readonly play: Function;
  readonly pause: Function;
}
export interface AudioInterface {
  readonly play: Function;
  readonly pause: Function;
}
export interface IRconStatsPlayers {
    name: string,
    playeruid: string,
    steamid: string,
    [key: string]: string;
  }
  
  export interface IRconStatsInfo {
    name: string,
    ver: string,
    [key: string]: string;
  }
  
  export interface IPU {
    cpu: number,
    memory: number,
    pid: number,
    ctime: number,
    elapsed: number,
    timestamp: number,
    elapsedFormated: string,
    ctimeFormated: string,
    cpuFormated: string,
    memFormated: string,
    [key: string]: number | string;
  }
  
  export interface IExtras {
    activeClients: number;
    clientsCounter: number;
    [key: string]: number;
  
  }
  
  export interface IClientMessagePaket {
    serverMessage: string;
    pidInfo: IPU;
    extras: IExtras;
    chatMessage: string;
    rconPlayers: IRconStatsPlayers[];
    rconInfo: IRconStatsInfo;
    latencyGoogle: string;
    latencyUser: string;
    [key: string]: string | IPU | IExtras | IRconStatsPlayers[] | IRconStatsInfo;
  }
  
  export interface PidInfoElements {
    cpu: HTMLElement | null,
    memory: HTMLElement | null,
    ctime: HTMLElement | null,
    elapsed: HTMLElement | null,
    timestamp: HTMLElement | null,
  }
  
  export interface ExtrasElements {
  activeClients: HTMLElement | null,
  clientsCounter: HTMLElement | null,
  }
  
  export interface RconInfoElements {
  name: HTMLElement | null,
  ver: HTMLElement | null,
  }
  
  
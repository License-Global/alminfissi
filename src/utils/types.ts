export type Worker = {
  workerName: string;
};

export type Nota = {
  content: string;
  date: Date;
  _id?: string;
};

export interface Activity {
  expire: string;
  status: string;
  note: string;
  completed: string | null;
  activityManager: string;
}

export interface Order {
  activity: {
    [key: string]: Activity;
    ricezioneAccessori: Activity;
    ricezioneAlluminio: Activity;
    ricezioneVetri: Activity;
    taglio: Activity;
    lavorazione: Activity;
    assemblaggio: Activity;
    installazioneVetri: Activity;
    imballaggio: Activity;
    trasporto: Activity;
    consegnaInstallazione: Activity;
  };
  _id: string;
  orderName: string;
  materialShelf: string;
  accessori: string;
  urgency: string;
  orderManager: string;
  note: Nota[];
  __v: number;
}

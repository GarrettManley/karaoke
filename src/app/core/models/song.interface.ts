export interface ISong {
  singer: string;
  songLink: string;
  status: {
    completed: boolean;
  };

  markAsSkipped(): void;
}

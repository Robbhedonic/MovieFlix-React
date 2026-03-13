export interface ICastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  order: number;
}

export interface ICrewMember {
  id: number;
  name: string;
  profile_path: string | null;
  department: string;
  job: string;
}

export interface ICredits {
  cast: ICastMember[];
  crew: ICrewMember[];
}

export interface GetBank {
  id: number;
  bankName: string | null;
  country: string | null;
  sitIpAddress: string | null;
  uatIpAddress: string | null;
  preprodIpAddress: string | null;
  prodIpAddress: string | null;
  status: string | null;
  dateAdded: string | null; 
  lastUpdated: string | null; 
  sitDate: string | null; 
  uatDate: string | null; 
  preprodDate: string | null; 
  prodDate: string | null; 
  currentIssue: string | null;
  reportedDate: string | null; 
}

export interface AddBank{
  bankName: string;
  country: string | null;
  sitIpAddress: string | null ;
  uatIpAddress: string | null;
  preprodIpAddress: string | null;
  prodIpAddress: string | null;
  status: string | null;
  dateAdded: string | null;
  lastUpdated: string | null;
  sitDate: Date | null;
  uatDate: Date | null;
  preprodDate: Date | null;
  prodDate: Date | null;
  currentIssue: string | null;
  reportedDate: string | null;
}

